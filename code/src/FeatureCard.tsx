import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  delay?: number;
}

const FeatureCard = ({ title, description, icon: Icon, path, delay = 0 }: FeatureCardProps) => {
  return (
    <Link to={path} className="block group">
      <Card 
        className="relative overflow-hidden p-6 h-full transition-all duration-500 hover:scale-105 hover:shadow-glow-blue animate-fade-in bg-gradient-card backdrop-blur-sm border-primary/20"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 group-hover:shadow-glow-blue">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse" />
        </div>
      </Card>
    </Link>
  );
};

export default FeatureCard;
