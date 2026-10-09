import { lazy, Suspense, useEffect, useState } from "react";

// Animated aurora/snow layers (blurred, many elements) are heavy to paint, so
// they are loaded as a separate chunk and only mounted on desktop after first paint.
const SubpageBackgroundLayers = lazy(() => import("./SubpageBackgroundLayers"));

const DESKTOP_QUERY = "(min-width: 768px)";

const SubpageBackground = () => {
  const [showLayers, setShowLayers] = useState(false);

  useEffect(() => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) return; // mobile: static gradient only

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const show = () => setShowLayers(window.matchMedia(DESKTOP_QUERY).matches);

    if (w.requestIdleCallback) {
      idleId = w.requestIdleCallback(show, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(show, 1500);
    }
    return () => {
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Static aurora-tinted gradient: the only layer on mobile, base layer on desktop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 30% 0%, hsl(160 60% 45% / 0.22) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 75% 0%, hsl(200 70% 50% / 0.18) 0%, transparent 70%)",
        }}
      />
      {showLayers && (
        <Suspense fallback={null}>
          <SubpageBackgroundLayers />
        </Suspense>
      )}
    </div>
  );
};

export default SubpageBackground;
