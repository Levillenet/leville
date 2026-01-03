import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  UserPlus, 
  Trash2, 
  Mail, 
  Shield, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  Users,
  Send
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Admin {
  id: string;
  user_id: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  email: string;
}

interface Invitation {
  id: string;
  email: string;
  created_at: string;
  expires_at: string;
}

interface UserManagementAdminProps {
  currentUserId: string;
  currentUserRole: 'admin' | 'super_admin' | null;
}

const UserManagementAdmin = ({ currentUserId, currentUserRole }: UserManagementAdminProps) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const isSuperAdmin = currentUserRole === 'super_admin';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch admins
      const { data: adminsData } = await supabase.functions.invoke('admin-auth', {
        body: { action: 'list_admins' }
      });

      if (adminsData?.success) {
        setAdmins(adminsData.admins || []);
      }

      // Fetch pending invitations
      const { data: invitationsData } = await supabase.functions.invoke('admin-auth', {
        body: { action: 'list_invitations' }
      });

      if (invitationsData?.success) {
        setInvitations(invitationsData.invitations || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendInvite = async () => {
    if (!newEmail.trim() || !isSuperAdmin) return;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      toast({
        title: "Virheellinen sähköposti",
        description: "Anna kelvollinen sähköpostiosoite",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-admin-invite', {
        body: { 
          email: newEmail.trim().toLowerCase(), 
          inviterUserId: currentUserId,
          siteUrl: window.location.origin
        }
      });

      if (error || !data?.success) {
        toast({
          title: "Virhe",
          description: data?.error || "Kutsun lähetys epäonnistui",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Kutsu lähetetty",
        description: data.emailSent 
          ? `Kutsu lähetetty osoitteeseen ${newEmail}` 
          : data.message || "Kutsu luotu onnistuneesti"
      });

      setNewEmail("");
      fetchData();
    } catch (error) {
      console.error('Error sending invite:', error);
      toast({
        title: "Virhe",
        description: "Kutsun lähetys epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleRevokeAccess = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { 
          action: 'revoke_access', 
          targetUserId: userId,
          inviterUserId: currentUserId
        }
      });

      if (error || !data?.success) {
        toast({
          title: "Virhe",
          description: data?.error || "Käyttöoikeuden poisto epäonnistui",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Käyttöoikeus poistettu",
        description: `Käyttäjän ${email} käyttöoikeus poistettu`
      });

      fetchData();
    } catch (error) {
      console.error('Error revoking access:', error);
      toast({
        title: "Virhe",
        description: "Käyttöoikeuden poisto epäonnistui",
        variant: "destructive"
      });
    }
  };

  const handleDeleteInvitation = async (email: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { 
          action: 'delete_invitation', 
          email,
          inviterUserId: currentUserId
        }
      });

      if (error || !data?.success) {
        toast({
          title: "Virhe",
          description: data?.error || "Kutsun poisto epäonnistui",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Kutsu poistettu",
        description: `Kutsu osoitteelle ${email} poistettu`
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting invitation:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fi-FI', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilExpiry = (expiresAt: string) => {
    const days = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      {/* Info box */}
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Users className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Käyttäjähallinta</strong> mahdollistaa admin-käyttäjien hallinnan. 
                Vain <strong>super_admin</strong>-roolilla varustetut käyttäjät voivat kutsua 
                uusia admineja ja poistaa käyttöoikeuksia.
              </p>
              <p>
                Kutsutut käyttäjät kirjautuvat <strong>magic link</strong> -menetelmällä: 
                he syöttävät sähköpostiosoitteensa ja saavat kirjautumislinkin sähköpostiinsa.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Send invitation */}
      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Kutsu uusi admin
            </CardTitle>
            <CardDescription>
              Lähetä kutsu uudelle admin-käyttäjälle. Kutsu on voimassa 7 päivää.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="sähköposti@esimerkki.fi"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="max-w-md"
              />
              <Button 
                onClick={handleSendInvite} 
                disabled={isSending || !newEmail.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSending ? "Lähetetään..." : "Lähetä kutsu"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current admins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Nykyiset adminit
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Ladataan...</p>
          ) : admins.length === 0 ? (
            <p className="text-muted-foreground">Ei admin-käyttäjiä</p>
          ) : (
            <div className="space-y-3">
              {admins.map((admin) => (
                <div 
                  key={admin.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {admin.role === 'super_admin' ? (
                        <ShieldCheck className="w-5 h-5 text-primary" />
                      ) : (
                        <Shield className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{admin.email}</span>
                        <Badge variant={admin.role === 'super_admin' ? 'default' : 'secondary'}>
                          {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                        </Badge>
                        {admin.user_id === currentUserId && (
                          <Badge variant="outline">Sinä</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lisätty {formatDate(admin.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  {isSuperAdmin && admin.user_id !== currentUserId && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Poista käyttöoikeus?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Haluatko varmasti poistaa käyttäjän <strong>{admin.email}</strong> admin-oikeudet? 
                            Käyttäjä ei voi enää kirjautua admin-paneeliin.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Peruuta</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleRevokeAccess(admin.user_id, admin.email)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Poista käyttöoikeus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending invitations */}
      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Avoimet kutsut
            </CardTitle>
            <CardDescription>
              Kutsut jotka odottavat hyväksyntää
            </CardDescription>
          </CardHeader>
          <CardContent>
            {invitations.length === 0 ? (
              <p className="text-muted-foreground">Ei avoimia kutsuja</p>
            ) : (
              <div className="space-y-3">
                {invitations.map((invitation) => {
                  const daysLeft = getDaysUntilExpiry(invitation.expires_at);
                  return (
                    <div 
                      key={invitation.id} 
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                          <span className="font-medium">{invitation.email}</span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Lähetetty {formatDate(invitation.created_at)}</span>
                            <span>•</span>
                            <span className={daysLeft <= 2 ? 'text-amber-500' : ''}>
                              {daysLeft} pv jäljellä
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Poista kutsu?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Haluatko varmasti poistaa kutsun osoitteelle <strong>{invitation.email}</strong>? 
                              Käyttäjä ei voi enää aktivoida admin-oikeuksiaan tällä kutsulla.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Peruuta</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteInvitation(invitation.email)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Poista kutsu
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Not super admin notice */}
      {!isSuperAdmin && (
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p>
                  Sinulla on <strong>admin</strong>-rooli. Vain <strong>super_admin</strong>-roolilla 
                  varustetut käyttäjät voivat kutsua uusia admineja ja poistaa käyttöoikeuksia.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagementAdmin;
