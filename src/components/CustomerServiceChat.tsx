import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, X, Loader2, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/customer-service-chat`;

export default function CustomerServiceChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your local Levi expert. Ask me anything about accommodation, activities, or planning your trip to Finnish Lapland! 🏔️" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Connection error");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m);
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages.slice(1)); // Skip initial greeting
    } catch (e) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `Sorry, something went wrong. Contact us via WhatsApp: +358 44 131 313 or email info@leville.net` 
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition-transform px-4 py-3"
        style={{ backgroundColor: "#B8860B", color: "#fff" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask for help with your stay"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Questions about your stay? Ask here!</span>
          </>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="flex flex-col h-[500px] max-h-[70vh] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-4 text-white" style={{ backgroundColor: "#B8860B" }}>
                <h3 className="font-semibold text-lg">Ask a Local 🏔️</h3>
                <p className="text-xs opacity-80">AI assistant • Your Levi travel guide</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                      msg.role === "user" 
                        ? "text-white rounded-br-md" 
                        : "bg-card border rounded-bl-md"
                    }`}
                    style={msg.role === "user" ? { backgroundColor: "#B8860B" } : undefined}
                    dangerouslySetInnerHTML={msg.role === "assistant" ? { 
                      __html: msg.content.replace(
                        /(https?:\/\/[^\s)<]+)/g, 
                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline font-medium" style="color: #B8860B">$1</a>'
                      ) 
                    } : undefined}
                    >
                      {msg.role === "user" ? msg.content : undefined}
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Support link */}
              <div className="px-3 py-2 border-t bg-muted/20">
                <Link
                  to="/asiakaspalvelu"
                  className="flex items-center gap-2 text-xs hover:underline"
                  style={{ color: "#B8860B" }}
                  onClick={() => setIsOpen(false)}
                >
                  <Headset className="w-3.5 h-3.5" />
                  Guest support & property guides →
                </Link>
              </div>

              {/* Input */}
              <div className="p-3 border-t bg-background">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                   <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about accommodation, activities, getting to Levi..."
                    disabled={isLoading}
                    className="flex-1"
                    autoFocus
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()} style={{ backgroundColor: "#B8860B" }}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
