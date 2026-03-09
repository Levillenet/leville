import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/customer-service-chat`;

interface InlineChatProps {
  greeting?: string;
  placeholder?: string;
  subtitle?: string;
}

export default function InlineChat({
  greeting = "Hi! I'm your local Levi expert. Ask me anything about your stay, activities, or getting around in Finnish Lapland! 🏔️",
  placeholder = "Ask about your accommodation, sauna, heating, activities...",
  subtitle = "AI assistant • Your Levi travel guide",
}: InlineChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
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
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
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
      await streamChat(newMessages.slice(1));
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Contact us via WhatsApp: +358 44 131 313 or email info@leville.net",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-xl border-2 border-primary/20">
      {/* Header */}
      <div className="p-4 text-white bg-primary">
        <h3 className="font-semibold text-lg">Ask a Local 🏔️</h3>
        <p className="text-xs opacity-80">{subtitle}</p>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className="h-[400px] md:h-[450px] overflow-y-auto p-4 space-y-3 bg-muted/30">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border rounded-bl-md"
              }`}
              dangerouslySetInnerHTML={
                msg.role === "assistant"
                  ? {
                      __html: msg.content.replace(
                        /(https?:\/\/[^\s)<]+)/g,
                        '<a href="$1" target="_blank" rel="noopener noreferrer" class="underline font-medium text-primary">$1</a>'
                      ),
                    }
                  : undefined
              }
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
        
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="flex-1"
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
