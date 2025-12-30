import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Language } from "@/translations";

interface WhatsAppChatProps {
  lang?: Language;
}

const WhatsAppChat = ({ lang = "fi" }: WhatsAppChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "35844131313"; // Leville.net WhatsApp number

  const content: Record<Language, { greeting: string; responseTime: string; placeholder: string }> = {
    fi: {
      greeting: "Kysy meiltä mitä vain! 👋",
      responseTime: "Yleensä vastaamme tunnissa",
      placeholder: "Kirjoita viestisi...",
    },
    en: {
      greeting: "Ask us anything! 👋",
      responseTime: "Usually we reply within an hour",
      placeholder: "Type your message...",
    },
    sv: {
      greeting: "Fråga oss vad som helst! 👋",
      responseTime: "Vanligtvis svarar vi inom en timme",
      placeholder: "Skriv ditt meddelande...",
    },
    de: {
      greeting: "Fragen Sie uns alles! 👋",
      responseTime: "Normalerweise antworten wir innerhalb einer Stunde",
      placeholder: "Schreiben Sie Ihre Nachricht...",
    },
    es: {
      greeting: "¡Pregúntanos lo que quieras! 👋",
      responseTime: "Normalmente respondemos en una hora",
      placeholder: "Escribe tu mensaje...",
    },
    fr: {
      greeting: "Posez-nous toutes vos questions ! 👋",
      responseTime: "Nous répondons généralement en une heure",
      placeholder: "Écrivez votre message...",
    },
  };

  const t = content[lang];
  
  const handleSend = () => {
    if (!message.trim()) return;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Use link click instead of window.open to bypass iframe restrictions
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setMessage("");
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Leville.net</h3>
                  <p className="text-white/80 text-xs">{t.responseTime}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat area */}
            <div className="p-4 bg-muted/30 min-h-[120px]">
              <div className="bg-background rounded-lg p-3 shadow-sm max-w-[85%]">
                <p className="text-sm text-foreground">
                  {t.greeting}
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  Leville.net
                </span>
              </div>
            </div>

            {/* Input area */}
            <div className="p-3 bg-background border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t.placeholder}
                  className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-[#25D366]"
                />
                <Button 
                  onClick={handleSend}
                  size="icon"
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white shrink-0"
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppChat;
