import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, userId, email, targetUserId, inviterUserId } = await req.json();
    const normalizedEmail = (email ?? '').toString().trim().toLowerCase();
    console.log('admin-auth action:', action, 'userId:', userId, 'email:', normalizedEmail);

    switch (action) {
      case 'check_and_activate': {
        if (!userId) {
          return new Response(
            JSON.stringify({ success: false, error: 'Puuttuva käyttäjä-ID' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check if user has an active role
        const { data: existingRole, error: existingRoleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .maybeSingle();

        if (existingRoleError) {
          console.error('Error checking existing role:', existingRoleError);
        }

        if (existingRole?.role) {
          console.log('User already has role:', existingRole.role);
          return new Response(
            JSON.stringify({ success: true, role: existingRole.role, isNew: false }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check if user was invited
        const { data: invitation, error: invitationError } = await supabase
          .from('admin_invitations')
          .select('*')
          .eq('email', normalizedEmail)
          .is('used_at', null)
          .gt('expires_at', new Date().toISOString())
          .maybeSingle();

        if (invitationError) {
          console.error('Error checking invitation:', invitationError);
        }

        if (!invitation) {
          console.log('No valid invitation found for:', normalizedEmail);
          return new Response(
            JSON.stringify({ success: false, error: 'Ei voimassa olevaa kutsua' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Activate the user as admin
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (roleError) {
          console.error('Error creating role:', roleError);
          return new Response(
            JSON.stringify({ success: false, error: 'Roolin luonti epäonnistui' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Mark invitation as used
        const { error: markUsedError } = await supabase
          .from('admin_invitations')
          .update({ used_at: new Date().toISOString() })
          .eq('id', invitation.id);

        if (markUsedError) {
          console.error('Error marking invitation as used:', markUsedError);
        }

        console.log('User activated as admin:', normalizedEmail);
        return new Response(
          JSON.stringify({ success: true, role: 'admin', isNew: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get_role': {
        const { data: role, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', userId)
          .maybeSingle();

        if (error) {
          console.error('Error getting role:', error);
        }

        return new Response(
          JSON.stringify({ success: true, role: role?.role || null }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'list_admins': {
        // Get all users with roles
        const { data: roles, error } = await supabase
          .from('user_roles')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error listing admins:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Virhe haettaessa admineja' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get user emails from auth.users
        const adminsWithEmail = [];

        for (const role of roles || []) {
          const { data: userData } = await supabase.auth.admin.getUserById(role.user_id);
          adminsWithEmail.push({
            ...role,
            email: userData?.user?.email || 'Tuntematon'
          });
        }

        return new Response(
          JSON.stringify({ success: true, admins: adminsWithEmail }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'list_invitations': {
        const { data: invitations, error } = await supabase
          .from('admin_invitations')
          .select('*')
          .is('used_at', null)
          .gt('expires_at', new Date().toISOString())
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error listing invitations:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Virhe haettaessa kutsuja' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true, invitations: invitations || [] }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create_invitation': {
        // Check if caller is super_admin
        const { data: callerRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', inviterUserId)
          .maybeSingle();

        if (callerRole?.role !== 'super_admin') {
          return new Response(
            JSON.stringify({ success: false, error: 'Vain super_admin voi kutsua käyttäjiä' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Check if email already has an invitation
        const { data: existingInvitation, error: existingInvitationError } = await supabase
          .from('admin_invitations')
          .select('id')
          .eq('email', normalizedEmail)
          .is('used_at', null)
          .maybeSingle();

        if (existingInvitationError) {
          console.error('Error checking existing invitation:', existingInvitationError);
        }

        if (existingInvitation) {
          return new Response(
            JSON.stringify({ success: false, error: 'Kutsu on jo lähetetty tälle sähköpostille' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Create invitation
        const { data: invitation, error } = await supabase
          .from('admin_invitations')
          .insert({
            email: normalizedEmail,
            invited_by: inviterUserId,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating invitation:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Kutsun luonti epäonnistui' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log('Invitation created for:', normalizedEmail);
        return new Response(
          JSON.stringify({ success: true, invitation }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'revoke_access': {
        // Check if caller is super_admin
        const { data: callerRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', inviterUserId)
          .maybeSingle();

        if (callerRole?.role !== 'super_admin') {
          return new Response(
            JSON.stringify({ success: false, error: 'Vain super_admin voi poistaa käyttöoikeuksia' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Can't revoke own access
        if (targetUserId === inviterUserId) {
          return new Response(
            JSON.stringify({ success: false, error: 'Et voi poistaa omaa käyttöoikeuttasi' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Delete user role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', targetUserId);

        if (error) {
          console.error('Error revoking access:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Käyttöoikeuden poisto epäonnistui' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log('Access revoked for user:', targetUserId);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'delete_invitation': {
        // Check if caller is super_admin
        const { data: callerRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', inviterUserId)
          .maybeSingle();

        if (callerRole?.role !== 'super_admin') {
          return new Response(
            JSON.stringify({ success: false, error: 'Vain super_admin voi poistaa kutsuja' }),
            { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await supabase
          .from('admin_invitations')
          .delete()
          .eq('email', normalizedEmail);

        if (error) {
          console.error('Error deleting invitation:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Kutsun poisto epäonnistui' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log('Invitation deleted for:', normalizedEmail);
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Error in admin-auth:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
