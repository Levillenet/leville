import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://leville.net',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PropertySettings {
  property_id: string;
  marketing_name?: string;
  cleaning_fee?: number;
  discount_1_night?: number;
  discount_2_nights?: number;
  discount_3_plus_nights?: number;
  show_discount?: boolean;
}

interface PeriodSettings {
  property_id: string;
  check_in: string;
  check_out: string;
  has_ski_pass?: boolean;
  has_special_offer?: boolean;
  custom_discount?: number;
  show_discount?: boolean;
}

interface SkiPassCapacity {
  date: string;
  allocated_passes: number;
  max_passes: number;
}

// Helper function to check if password matches admin password
function isPasswordAdmin(password: string | null): boolean {
  if (!password) return false;
  const adminPassword = Deno.env.get('ADMIN_PASSWORD');
  return password === adminPassword;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { action, data } = await req.json();
    
    // Verify admin for write operations using password from data
    const writeActions = ['upsert_property', 'upsert_period', 'update_capacity', 'reset_property', 'reset_all', 'update_site_setting'];
    if (writeActions.includes(action)) {
      const password = data?.password;
      if (!isPasswordAdmin(password)) {
        console.log('Admin auth failed for action:', action, '- invalid password');
        return new Response(
          JSON.stringify({ error: 'Unauthorized - Admin access required' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    console.log('Admin action:', action);
    
    switch (action) {
      case 'get_all_settings': {
        // Get all property settings
        const { data: propertySettings, error: propError } = await supabase
          .from('property_settings')
          .select('*');
        
        if (propError) throw propError;
        
        // Get all period settings
        const { data: periodSettings, error: periodError } = await supabase
          .from('period_settings')
          .select('*');
        
        if (periodError) throw periodError;
        
        // Get ski pass capacity
        const { data: skiPassCapacity, error: capError } = await supabase
          .from('ski_pass_capacity')
          .select('*');
        
        if (capError) throw capError;
        
        // Get site settings
        const { data: siteSettings, error: siteError } = await supabase
          .from('site_settings')
          .select('*');
        
        if (siteError) throw siteError;
        
        console.log('Fetched settings:', {
          properties: propertySettings?.length || 0,
          periods: periodSettings?.length || 0,
          capacity: skiPassCapacity?.length || 0,
          site: siteSettings?.length || 0
        });
        
        return new Response(
          JSON.stringify({ 
            propertySettings: propertySettings || [], 
            periodSettings: periodSettings || [],
            skiPassCapacity: skiPassCapacity || [],
            siteSettings: siteSettings || []
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'upsert_property': {
        const settings = data as PropertySettings;
        console.log('Upserting property:', settings.property_id);
        
        const { error } = await supabase
          .from('property_settings')
          .upsert({
            property_id: settings.property_id,
            marketing_name: settings.marketing_name,
            cleaning_fee: settings.cleaning_fee,
            discount_1_night: settings.discount_1_night,
            discount_2_nights: settings.discount_2_nights,
            discount_3_plus_nights: settings.discount_3_plus_nights,
            show_discount: settings.show_discount,
            updated_at: new Date().toISOString()
          }, { onConflict: 'property_id' });
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'upsert_period': {
        const settings = data as PeriodSettings;
        console.log('Upserting period:', settings.property_id, settings.check_in, settings.check_out);
        
        const { error } = await supabase
          .from('period_settings')
          .upsert({
            property_id: settings.property_id,
            check_in: settings.check_in,
            check_out: settings.check_out,
            has_ski_pass: settings.has_ski_pass,
            has_special_offer: settings.has_special_offer,
            custom_discount: settings.custom_discount,
            show_discount: settings.show_discount,
            updated_at: new Date().toISOString()
          }, { onConflict: 'property_id,check_in,check_out' });
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'update_capacity': {
        const capacityData = data as SkiPassCapacity;
        console.log('Updating capacity for date:', capacityData.date);
        
        const { error } = await supabase
          .from('ski_pass_capacity')
          .upsert({
            date: capacityData.date,
            allocated_passes: capacityData.allocated_passes,
            max_passes: capacityData.max_passes,
            updated_at: new Date().toISOString()
          }, { onConflict: 'date' });
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'reset_property': {
        const { property_id } = data;
        console.log('Resetting property:', property_id);
        
        const { error } = await supabase
          .from('property_settings')
          .delete()
          .eq('property_id', property_id);
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'reset_all': {
        console.log('Resetting all settings');
        
        // Delete all property settings
        const { error: propError } = await supabase
          .from('property_settings')
          .delete()
          .neq('property_id', '');
        
        if (propError) throw propError;
        
        // Delete all period settings
        const { error: periodError } = await supabase
          .from('period_settings')
          .delete()
          .neq('property_id', '');
        
        if (periodError) throw periodError;
        
        // Delete all ski pass capacity
        const { error: capError } = await supabase
          .from('ski_pass_capacity')
          .delete()
          .neq('date', '');
        
        if (capError) throw capError;
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      case 'update_site_setting': {
        const { setting_id, value } = data;
        console.log('Updating site setting:', setting_id, value);
        
        const { error } = await supabase
          .from('site_settings')
          .upsert({
            id: setting_id,
            value: value,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
        
        if (error) throw error;
        
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
    
  } catch (error) {
    console.error('Admin settings error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
