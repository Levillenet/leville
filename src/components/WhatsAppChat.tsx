import { lazy, Suspense, useEffect, useState } from "react";
import type { Language } from "@/translations";

// The floating chat button is not needed for first paint. Its code (and
// framer-motion) is loaded after the page is idle, off the critical path.
const WhatsAppChatImpl = lazy(() => import("./WhatsAppChatImpl"));

interface WhatsAppChatProps {
  lang?: Language;
}

const WhatsAppChat = ({ lang = "fi" }: WhatsAppChatProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <WhatsAppChatImpl lang={lang} />
    </Suspense>
  );
};

export default WhatsAppChat;
