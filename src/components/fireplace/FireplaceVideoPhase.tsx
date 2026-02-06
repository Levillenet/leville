import { useEffect, useRef, useState, useCallback } from "react";
import { Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface FireplaceVideoPhaseProps {
  lang: "fi" | "en";
  videoUrl: string;
  fallbackTimer: number;
  onComplete: () => void;
}

const t = {
  fi: {
    stepTitle: "Vaihe 1: Katso opastusvideo",
    watching: "Katso video loppuun asti jatkaaksesi ⏳",
    ready: "Video katsottu ✓",
    continueBtn: "Jatka ohjeisiin →",
  },
  en: {
    stepTitle: "Step 1: Watch the instruction video",
    watching: "Please watch the video to the end to continue ⏳",
    ready: "Video watched ✓",
    continueBtn: "Continue to instructions →",
  },
};

function extractVideoId(url: string): string {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/
  );
  return match?.[1] ?? "";
}

const PLAYER_ID = "fireplace-yt-player";

const FireplaceVideoPhase = ({
  lang,
  videoUrl,
  fallbackTimer,
  onComplete,
}: FireplaceVideoPhaseProps) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const playerRef = useRef<any>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout>>();
  const strings = t[lang];
  const videoId = extractVideoId(videoUrl);

  const handleVideoEnd = useCallback(() => {
    setVideoEnded(true);
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
  }, []);

  // Load the YouTube IFrame API script
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    );

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      setApiReady(true);
    };

    if (!existingScript) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  // Create player once API is ready
  useEffect(() => {
    if (!apiReady || !videoId) return;

    // Small delay to ensure DOM element exists
    const initTimeout = setTimeout(() => {
      const container = document.getElementById(PLAYER_ID);
      if (!container || playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player(PLAYER_ID, {
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            rel: 0,
            modestbranding: 1,
            origin: window.location.origin,
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                handleVideoEnd();
              }
            },
          },
        });
      } catch (e) {
        console.error("YT Player init error:", e);
      }
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch {}
      }
      playerRef.current = null;
    };
  }, [apiReady, videoId, handleVideoEnd]);

  // Fallback timer
  useEffect(() => {
    fallbackRef.current = setTimeout(() => {
      setVideoEnded(true);
    }, fallbackTimer * 1000);

    return () => {
      if (fallbackRef.current) clearTimeout(fallbackRef.current);
    };
  }, [fallbackTimer]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground text-center">
        {strings.stepTitle}
      </h2>

      {/* Video container */}
      <div className="glass-card border-border/30 rounded-xl overflow-hidden">
        <div className="aspect-video w-full">
          <div id={PLAYER_ID} className="w-full h-full" />
        </div>
      </div>

      {/* Status message */}
      <div className="text-center">
        {videoEnded ? (
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{strings.ready}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Play className="w-5 h-5" />
            <span>{strings.watching}</span>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={onComplete}
          disabled={!videoEnded}
          className={
            videoEnded
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "opacity-50 cursor-not-allowed"
          }
        >
          {strings.continueBtn}
        </Button>
      </div>
    </div>
  );
};

export default FireplaceVideoPhase;
