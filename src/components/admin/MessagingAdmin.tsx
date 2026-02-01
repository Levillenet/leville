import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare, RefreshCw, Send, Plus, Pencil, Trash2, Users, CheckSquare, Shield, Clock, Mail } from "lucide-react";
import { getAllDefaultPropertyDetails } from "@/data/propertyDetails";

type SendMethod = 'whatsapp' | 'email';

interface GuestForMessaging {
  bookingId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  apartmentName: string;
  apartmentId: string;
  arrival: string;
  departure: string;
  selected: boolean;
}

interface MessageTemplate {
  id: string;
  name: string;
  message: string;
  is_default: boolean;
}

interface MessagingAdminProps {
  isViewer: boolean;
}

const DATA_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

const MessagingAdmin = ({ isViewer }: MessagingAdminProps) => {
  const [guests, setGuests] = useState<GuestForMessaging[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("free");
  const [freeMessage, setFreeMessage] = useState("");
  const [isLoadingGuests, setIsLoadingGuests] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateMessage, setNewTemplateMessage] = useState("");
  const [propertyNames, setPropertyNames] = useState<Map<string, string>>(new Map());
  const [dataFetchedAt, setDataFetchedAt] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [sendMethod, setSendMethod] = useState<SendMethod>('whatsapp');
  const { toast } = useToast();

  // Auto-clear guest data after 5 minutes for privacy
  useEffect(() => {
    if (guests.length === 0 || !dataFetchedAt) {
      setRemainingSeconds(0);
      return;
    }

    const expiryTime = dataFetchedAt + DATA_EXPIRY_MS;
    
    // Update countdown every second
    const countdownInterval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((expiryTime - Date.now()) / 1000));
      setRemainingSeconds(remaining);
      
      if (remaining <= 0) {
        setGuests([]);
        setDataFetchedAt(null);
        toast({
          title: "Tiedot tyhjennetty",
          description: "Vierastiedot poistettu automaattisesti tietosuojasyistä",
        });
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [guests.length, dataFetchedAt, toast]);

  // Clear data on component unmount
  useEffect(() => {
    return () => {
      setGuests([]);
      setDataFetchedAt(null);
    };
  }, []);

  const clearGuestsNow = () => {
    setGuests([]);
    setDataFetchedAt(null);
    toast({
      title: "Tiedot tyhjennetty",
      description: "Vierastiedot poistettu manuaalisesti",
    });
  };

  const formatRemainingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Build property name lookup map
  useEffect(() => {
    const defaultProperties = getAllDefaultPropertyDetails();
    const nameMap = new Map<string, string>();
    defaultProperties.forEach(p => {
      nameMap.set(p.id, p.name);
    });
    setPropertyNames(nameMap);
  }, []);

  // Load templates on mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  const getAdminPassword = () => localStorage.getItem('admin_password') || '';

  const fetchTemplates = async () => {
    setIsLoadingTemplates(true);
    try {
      const { data, error } = await supabase.functions.invoke('manage-message-templates', {
        body: { action: 'list', password: getAdminPassword() }
      });

      if (error) throw error;
      if (data?.templates) {
        setTemplates(data.templates);
        // Select first template by default
        if (data.templates.length > 0 && selectedTemplateId === "free") {
          setSelectedTemplateId(data.templates[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Virhe",
        description: "Templatejen haku epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const fetchGuests = async () => {
    setIsLoadingGuests(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-current-guests', {
        body: { password: getAdminPassword() }
      });

      if (error) throw error;
      
      if (data?.guests) {
        const guestsWithNames = data.guests.map((g: any) => ({
          ...g,
          apartmentName: propertyNames.get(g.apartmentId) || `ID: ${g.apartmentId}`,
          selected: false,
        }));
        setGuests(guestsWithNames);
        setDataFetchedAt(Date.now()); // Start the countdown timer
        
        toast({
          title: "Vieraat haettu",
          description: `${guestsWithNames.length} vierasta löytyi. Tiedot poistetaan automaattisesti 5 min kuluttua.`
        });
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
      toast({
        title: "Virhe",
        description: "Vieraiden haku epäonnistui",
        variant: "destructive"
      });
    } finally {
      setIsLoadingGuests(false);
    }
  };

  const toggleGuestSelection = (bookingId: number) => {
    setGuests(prev => prev.map(g => 
      g.bookingId === bookingId ? { ...g, selected: !g.selected } : g
    ));
  };

  const selectAllGuests = () => {
    const allSelected = guests.every(g => g.selected);
    setGuests(prev => prev.map(g => ({ ...g, selected: !allSelected })));
  };

  const getMessageContent = (): string => {
    if (selectedTemplateId === "free") {
      return freeMessage;
    }
    const template = templates.find(t => t.id === selectedTemplateId);
    return template?.message || "";
  };

  const formatMessage = (template: string, guest: GuestForMessaging): string => {
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return `${date.getDate()}.${date.getMonth() + 1}.`;
    };
    
    return template
      .replace(/\[NIMI\]/g, `${guest.firstName} ${guest.lastName}`.trim() || 'Vieras')
      .replace(/\[HUONEISTO\]/g, guest.apartmentName)
      .replace(/\[SAAPUMINEN\]/g, formatDate(guest.arrival))
      .replace(/\[LÄHTÖ\]/g, formatDate(guest.departure))
      .replace(/\[VIESTI\]/g, freeMessage);
  };

  const cleanPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Handle Finnish numbers
    if (cleaned.startsWith('0')) {
      cleaned = '358' + cleaned.substring(1);
    } else if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    } else if (!cleaned.startsWith('358') && !cleaned.startsWith('44') && !cleaned.startsWith('46')) {
      // Assume Finnish if no country code detected
      cleaned = '358' + cleaned;
    }
    
    return cleaned;
  };

  const createWhatsAppLink = (guest: GuestForMessaging): string => {
    const messageContent = getMessageContent();
    const formattedMessage = formatMessage(messageContent, guest);
    const cleanedPhone = cleanPhoneNumber(guest.phone);
    const encodedMessage = encodeURIComponent(formattedMessage);
    return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
  };

  const openWhatsApp = async (guest: GuestForMessaging) => {
    if (isViewer) {
      toast({
        title: "Katselutila",
        description: "Et voi lähettää viestejä katselutilassa",
        variant: "destructive"
      });
      return;
    }

    const link = createWhatsAppLink(guest);
    const messageContent = getMessageContent();
    const formattedMessage = formatMessage(messageContent, guest);

    // Log the message
    try {
      await supabase.functions.invoke('log-message', {
        body: {
          password: getAdminPassword(),
          guestName: `${guest.firstName} ${guest.lastName}`,
          phone: guest.phone,
          apartmentName: guest.apartmentName,
          templateName: selectedTemplateId === "free" ? "Vapaa viesti" : 
            templates.find(t => t.id === selectedTemplateId)?.name,
          messageContent: formattedMessage
        }
      });
    } catch (error) {
      console.error('Error logging message:', error);
    }

    // Open WhatsApp
    window.open(link, '_blank');
  };

  const openSelectedWhatsApps = () => {
    const selectedGuests = guests.filter(g => g.selected);
    if (selectedGuests.length === 0) {
      toast({
        title: "Valitse vieraita",
        description: "Valitse ensin vieraat joille haluat lähettää viestin",
        variant: "destructive"
      });
      return;
    }

    selectedGuests.forEach((guest, index) => {
      // Stagger opening to avoid popup blockers
      setTimeout(() => openWhatsApp(guest), index * 500);
    });
  };

  // Create Gmail compose URL with BCC
  // Check if user is on mobile device
  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const createEmailLink = (): string => {
    const selectedGuests = guests.filter(g => g.selected && g.email);
    
    if (selectedGuests.length === 0) return '';
    
    // BCC: all selected emails separated by comma
    const bccEmails = selectedGuests
      .map(g => g.email)
      .filter(Boolean)
      .join(',');
    
    // Get message content without personalization variables
    const messageContent = getMessageContent()
      .replace(/\[NIMI\]/g, '')
      .replace(/\[HUONEISTO\]/g, '')
      .replace(/\[SAAPUMINEN\]/g, '')
      .replace(/\[LÄHTÖ\]/g, '')
      .replace(/\[VIESTI\]/g, freeMessage)
      .trim();
    
    // Get template name for subject
    const templateName = selectedTemplateId === "free" 
      ? "Viesti Levilleltä" 
      : templates.find(t => t.id === selectedTemplateId)?.name || "Viesti Levilleltä";
    
    // On mobile, use mailto: which opens native email app (Gmail on Android)
    if (isMobileDevice()) {
      const mailtoParams = new URLSearchParams({
        bcc: bccEmails,
        subject: templateName,
        body: messageContent
      });
      return `mailto:info@leville.net?${mailtoParams.toString()}`;
    }
    
    // On desktop, use Gmail web compose URL
    const params = new URLSearchParams({
      to: 'info@leville.net',
      bcc: bccEmails,
      su: templateName,
      body: messageContent,
      tf: 'cm'
    });
    
    return `https://mail.google.com/mail/u/0/?${params.toString()}`;
  };

  const openGmail = async () => {
    if (isViewer) {
      toast({
        title: "Katselutila",
        description: "Et voi lähettää viestejä katselutilassa",
        variant: "destructive"
      });
      return;
    }

    const selectedWithEmail = guests.filter(g => g.selected && g.email);
    
    if (selectedWithEmail.length === 0) {
      toast({
        title: "Ei sähköpostiosoitteita",
        description: "Valituilla vierailla ei ole sähköpostiosoitetta",
        variant: "destructive"
      });
      return;
    }

    const link = createEmailLink();
    
    // Log the message
    try {
      await supabase.functions.invoke('log-message', {
        body: {
          password: getAdminPassword(),
          guestName: `${selectedWithEmail.length} vierasta (sähköposti)`,
          phone: '-',
          apartmentName: '-',
          templateName: selectedTemplateId === "free" ? "Vapaa viesti" : 
            templates.find(t => t.id === selectedTemplateId)?.name,
          messageContent: `Email BCC: ${selectedWithEmail.length} vastaanottajaa`
        }
      });
    } catch (error) {
      console.error('Error logging message:', error);
    }

    window.open(link, '_blank');
  };

  const saveTemplate = async () => {
    if (!newTemplateName.trim() || !newTemplateMessage.trim()) {
      toast({
        title: "Virhe",
        description: "Nimi ja viesti ovat pakollisia",
        variant: "destructive"
      });
      return;
    }

    try {
      const action = editingTemplate ? 'update' : 'create';
      const { error } = await supabase.functions.invoke('manage-message-templates', {
        body: {
          action,
          password: getAdminPassword(),
          template: {
            id: editingTemplate?.id,
            name: newTemplateName,
            message: newTemplateMessage
          }
        }
      });

      if (error) throw error;

      toast({
        title: editingTemplate ? "Template päivitetty" : "Template luotu",
        description: `"${newTemplateName}" tallennettu`
      });

      setTemplateDialogOpen(false);
      setEditingTemplate(null);
      setNewTemplateName("");
      setNewTemplateMessage("");
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Virhe",
        description: "Templaten tallennus epäonnistui",
        variant: "destructive"
      });
    }
  };

  const deleteTemplate = async (template: MessageTemplate) => {
    if (template.is_default) {
      toast({
        title: "Virhe",
        description: "Oletustemplateja ei voi poistaa",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('manage-message-templates', {
        body: {
          action: 'delete',
          password: getAdminPassword(),
          template: { id: template.id }
        }
      });

      if (error) throw error;

      toast({
        title: "Template poistettu",
        description: `"${template.name}" poistettu`
      });

      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Virhe",
        description: "Templaten poisto epäonnistui",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (template: MessageTemplate) => {
    setEditingTemplate(template);
    setNewTemplateName(template.name);
    setNewTemplateMessage(template.message);
    setTemplateDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingTemplate(null);
    setNewTemplateName("");
    setNewTemplateMessage("");
    setTemplateDialogOpen(true);
  };

  const selectedCount = guests.filter(g => g.selected).length;
  const selectedEmailCount = guests.filter(g => g.selected && g.email).length;
  const formatDateRange = (arrival: string, departure: string) => {
    const a = new Date(arrival);
    const d = new Date(departure);
    return `${a.getDate()}.${a.getMonth() + 1}. - ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Vierasviestintä
          </CardTitle>
          <CardDescription>
            Lähetä viestejä tällä hetkellä majoittuville vieraille
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={fetchGuests} disabled={isLoadingGuests}>
            {isLoadingGuests ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Haetaan...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Hae majoittuvat vieraat
              </>
            )}
          </Button>
          {guests.length > 0 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Tietosuoja: tiedot poistetaan automaattisesti
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-700 dark:text-amber-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-mono">{formatRemainingTime(remainingSeconds)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearGuestsNow}
                    className="text-amber-700 border-amber-300 hover:bg-amber-100 dark:text-amber-300 dark:border-amber-700 dark:hover:bg-amber-900"
                  >
                    Tyhjennä nyt
                  </Button>
                </div>
              </div>
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                <Users className="w-3 h-3 inline mr-1" />
                {guests.length} vierasta • Tiedot eivät tallennu tietokantaan
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Send Method Toggle */}
      {guests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="w-5 h-5" />
              Lähetystapa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                variant={sendMethod === 'whatsapp' ? 'default' : 'outline'}
                onClick={() => setSendMethod('whatsapp')}
                className={sendMethod === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#128C7E] text-white' : ''}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant={sendMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setSendMethod('email')}
                className={sendMethod === 'email' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
              >
                <Mail className="w-4 h-4 mr-2" />
                Sähköposti
              </Button>
            </div>
            {sendMethod === 'email' && (
              <p className="mt-3 text-sm text-muted-foreground">
                Avaa Gmail valittujen vieraiden sähköpostiosoitteilla piilokopiona (BCC). 
                Vastaanottaja: info@leville.net
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Guest List */}
      {guests.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Vieraslista</CardTitle>
            <Button variant="outline" size="sm" onClick={selectAllGuests}>
              <CheckSquare className="w-4 h-4 mr-2" />
              {guests.every(g => g.selected) ? 'Poista valinnat' : 'Valitse kaikki'}
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {guests.map((guest) => (
              <div
                key={guest.bookingId}
                className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={guest.selected}
                    onCheckedChange={() => toggleGuestSelection(guest.bookingId)}
                  />
                  <div className="space-y-1">
                    <p className="font-medium">
                      {guest.firstName} {guest.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {guest.apartmentName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateRange(guest.arrival, guest.departure)}
                      {sendMethod === 'whatsapp' && guest.phone && ` • ${guest.phone}`}
                      {sendMethod === 'email' && guest.email && ` • ${guest.email}`}
                      {sendMethod === 'email' && !guest.email && (
                        <span className="text-destructive"> • Ei sähköpostia</span>
                      )}
                    </p>
                  </div>
                </div>
                {sendMethod === 'whatsapp' ? (
                  <Button
                    onClick={() => openWhatsApp(guest)}
                    disabled={isViewer || !getMessageContent() || !guest.phone}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    {guest.email ? '✓ Sähköposti' : '—'}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Message Templates */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Viestitemplate</CardTitle>
            <CardDescription>
              Valitse valmis template tai kirjoita vapaa viesti
            </CardDescription>
          </div>
          {!isViewer && (
            <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={openNewDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  Lisää template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingTemplate ? 'Muokkaa templateä' : 'Uusi template'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">Nimi</Label>
                    <Input
                      id="template-name"
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      placeholder="Esim. Tervetuloa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-message">Viesti</Label>
                    <Textarea
                      id="template-message"
                      value={newTemplateMessage}
                      onChange={(e) => setNewTemplateMessage(e.target.value)}
                      placeholder="Hei [NIMI]! Tervetuloa majoittumaan..."
                      rows={4}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Muuttujat: [NIMI], [HUONEISTO], [SAAPUMINEN], [LÄHTÖ], [VIESTI]
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>
                    Peruuta
                  </Button>
                  <Button onClick={saveTemplate}>
                    Tallenna
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoadingTemplates ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : (
            <RadioGroup value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
              {templates.map((template) => (
                <div key={template.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={template.id} id={template.id} />
                    <Label htmlFor={template.id} className="cursor-pointer">
                      <span className="font-medium">{template.name}</span>
                      {template.is_default && (
                        <span className="ml-2 text-xs text-muted-foreground">(oletus)</span>
                      )}
                    </Label>
                  </div>
                  {!isViewer && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(template)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      {!template.is_default && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTemplate(template)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free" className="cursor-pointer font-medium">
                  Vapaa viesti
                </Label>
              </div>
            </RadioGroup>
          )}

          {/* Free message textarea or template preview */}
          {selectedTemplateId === "free" ? (
            <Textarea
              value={freeMessage}
              onChange={(e) => setFreeMessage(e.target.value)}
              placeholder="Kirjoita vapaa viesti vieraille..."
              rows={4}
            />
          ) : (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                {templates.find(t => t.id === selectedTemplateId)?.message}
              </p>
            </div>
          )}

          {/* Send to selected button */}
          {guests.length > 0 && selectedCount > 0 && (
            sendMethod === 'whatsapp' ? (
              <Button
                onClick={openSelectedWhatsApps}
                disabled={isViewer || !getMessageContent()}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Lähetä WhatsApp valituille ({selectedCount})
              </Button>
            ) : (
              <Button
                onClick={openGmail}
                disabled={isViewer || !getMessageContent() || selectedEmailCount === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Avaa Gmail ({selectedEmailCount} vastaanottajaa)
              </Button>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingAdmin;
