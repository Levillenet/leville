import { useTimedNotices } from "@/hooks/useTimedNotices";
import { Info, AlertTriangle, Sparkles } from "lucide-react";

interface TimedNoticeProps {
  pageId: string;
  lang?: string;
}

const styleConfig: Record<string, { bg: string; border: string; icon: React.ReactNode }> = {
  info: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    icon: <Info className="w-5 h-5 text-primary flex-shrink-0" />,
  },
  highlight: {
    bg: "bg-accent/20",
    border: "border-accent/40",
    icon: <Sparkles className="w-5 h-5 text-accent-foreground flex-shrink-0" />,
  },
  warning: {
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    icon: <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />,
  },
};

const TimedNotice = ({ pageId, lang = "fi" }: TimedNoticeProps) => {
  const { notices, getContent } = useTimedNotices(pageId, lang);

  if (notices.length === 0) return null;

  return (
    <div className="space-y-3 mb-8">
      {notices.map((notice) => {
        const content = getContent(notice);
        if (!content) return null;

        const config = styleConfig[notice.style] || styleConfig.info;

        return (
          <div
            key={notice.id}
            className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg} ${config.border}`}
          >
            {config.icon}
            <p className="text-sm text-foreground leading-relaxed">{content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TimedNotice;
