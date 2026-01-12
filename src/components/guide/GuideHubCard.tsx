import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

interface GuideHubCardProps {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
  readMoreText?: string;
}

const GuideHubCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon,
  image,
  imageAlt,
  readMoreText = "Read more"
}: GuideHubCardProps) => {
  return (
    <Link 
      to={href}
      className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
      aria-label={`${readMoreText}: ${title}`}
    >
      <Card className="glass-card border-border/30 hover:border-primary/50 transition-all duration-300 h-full cursor-pointer group overflow-hidden">
        {image && (
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <OptimizedImage 
              src={image} 
              alt={imageAlt || title}
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>
        )}
        <CardContent className={`p-4 sm:p-6 ${image ? 'pt-4' : ''}`}>
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 line-clamp-3">
                {description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                {readMoreText}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GuideHubCard;
