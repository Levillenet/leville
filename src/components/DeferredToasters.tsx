import { lazy, Suspense, useEffect, useState } from "react";

// Toasts are only needed after user interaction, so keep Radix toast + sonner out of the
// startup bundle: mount them after first paint (idle), or immediately on admin routes.
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));

const DeferredToasters = () => {
  const [ready, setReady] = useState(() => window.location.pathname.startsWith("/admin"));

  useEffect(() => {
    if (ready) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 2000);
    return () => window.clearTimeout(t);
  }, [ready]);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
    </Suspense>
  );
};

export default DeferredToasters;
