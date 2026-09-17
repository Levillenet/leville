import { useState } from "react";
import { z } from "zod";
import { Loader2, Send, CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { WhatsAppIcon } from "@/components/icons/SocialIcons";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  groupType: z.enum(["seura", "yritys", "perhe", "muu"]),
  groupSize: z.string().trim().min(1).max(10),
  arrival: z.string().trim().max(20).optional(),
  departure: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  lang: "fi" | "en";
  buildingName: string;
  heading: string;
  intro: string;
}

const t = {
  fi: {
    name: "Nimi",
    email: "Sähköposti",
    phone: "Puhelin",
    groupType: "Ryhmän tyyppi",
    types: { seura: "Urheiluseura / treenileiri", yritys: "Yritys", perhe: "Perhe tai suku", muu: "Muu" },
    groupSize: "Henkilömäärä",
    arrival: "Saapuminen",
    departure: "Lähtö",
    message: "Viesti",
    submit: "Lähetä tarjouspyyntö",
    sending: "Lähetetään...",
    thanksTitle: "Kiitos tarjouspyynnöstä!",
    thanksText: "Otamme sinuun yhteyttä yleensä saman tai seuraavan arkipäivän aikana.",
    errorTitle: "Lähetys epäonnistui",
    errorText: "Yritä uudelleen tai ota yhteyttä sähköpostilla.",
    invalid: "Tarkista nimi, sähköposti ja henkilömäärä.",
    or: "Tai ota suoraan yhteyttä:",
    required: "*",
  },
  en: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    groupType: "Group type",
    types: { seura: "Sports club / training camp", yritys: "Company", perhe: "Family or relatives", muu: "Other" },
    groupSize: "Number of people",
    arrival: "Arrival",
    departure: "Departure",
    message: "Message",
    submit: "Send quote request",
    sending: "Sending...",
    thanksTitle: "Thank you for your request!",
    thanksText: "We usually reply the same or the next business day.",
    errorTitle: "Sending failed",
    errorText: "Please try again or contact us by email.",
    invalid: "Please check name, email and number of people.",
    or: "Or contact us directly:",
    required: "*",
  },
};

const GroupInquiryForm = ({ lang, buildingName, heading, intro }: Props) => {
  const L = t[lang];
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    groupType: "seura",
    groupSize: "",
    arrival: "",
    departure: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: L.invalid, variant: "destructive" });
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-group-inquiry", {
        body: { ...parsed.data, building: buildingName, language: lang },
      });
      if (error) throw error;
      setSent(true);
      toast({ title: L.thanksTitle, description: L.thanksText });
    } catch {
      toast({ title: L.errorTitle, description: L.errorText, variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="glass-card border border-primary/30 rounded-xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">{L.thanksTitle}</h3>
        <p className="text-muted-foreground">{L.thanksText}</p>
      </div>
    );
  }

  return (
    <div className="glass-card border border-border/30 rounded-xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">{heading}</h2>
      <p className="text-muted-foreground mb-6">{intro}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gi-name">{L.name} {L.required}</Label>
            <Input id="gi-name" value={form.name} onChange={(e) => set("name", e.target.value)} required maxLength={100} />
          </div>
          <div>
            <Label htmlFor="gi-email">{L.email} {L.required}</Label>
            <Input id="gi-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="gi-phone">{L.phone}</Label>
            <Input id="gi-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={30} />
          </div>
          <div>
            <Label htmlFor="gi-type">{L.groupType}</Label>
            <select
              id="gi-type"
              value={form.groupType}
              onChange={(e) => set("groupType", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            >
              {(Object.keys(L.types) as (keyof typeof L.types)[]).map((k) => (
                <option key={k} value={k}>{L.types[k]}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="gi-size">{L.groupSize} {L.required}</Label>
            <Input id="gi-size" inputMode="numeric" value={form.groupSize} onChange={(e) => set("groupSize", e.target.value)} required maxLength={10} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="gi-arrival">{L.arrival}</Label>
              <Input id="gi-arrival" type="date" value={form.arrival} onChange={(e) => set("arrival", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="gi-departure">{L.departure}</Label>
              <Input id="gi-departure" type="date" value={form.departure} onChange={(e) => set("departure", e.target.value)} />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="gi-message">{L.message}</Label>
          <Textarea id="gi-message" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} maxLength={2000} />
        </div>

        <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
          {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          {sending ? L.sending : L.submit}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border/40">
        <p className="text-sm text-muted-foreground mb-3">{L.or}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="mailto:info@leville.net" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Mail className="w-4 h-4" /> info@leville.net
          </a>
          <a href="https://wa.me/35844131313" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline">
            <WhatsAppIcon className="w-4 h-4" /> WhatsApp +358 44 13 13 13
          </a>
          <a href="tel:+358441313131" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Phone className="w-4 h-4" /> +358 44 13 13 13
          </a>
        </div>
      </div>
    </div>
  );
};

export default GroupInquiryForm;
