import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export interface ReadNextLink {
  title: string;
  desc: string;
  href: string;
}

interface ReadNextSectionProps {
  title: string;
  links: ReadNextLink[];
}

const ReadNextSection = ({ title, links }: ReadNextSectionProps) => {
  return (
    <section className="mb-12 pt-8 border-t border-border/30">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((link, idx) => (
          <Link key={idx} to={link.href} className="block group">
            <Card className="glass-card border-border/30 hover:border-primary/50 transition-colors p-4 h-full">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{link.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ReadNextSection;
