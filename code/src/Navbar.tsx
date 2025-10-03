import { Link, useLocation } from "react-router-dom";
import { Home, Rocket, Globe, BookOpen, Book } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/nbl-game", label: "NBL Training", icon: Rocket },
    { path: "/cupola-earth", label: "Cupola Earth", icon: Globe },
    { path: "/story", label: "Story", icon: BookOpen },
    { path: "/ebook", label: "E-Book", icon: Book },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="bg-gradient-space bg-clip-text text-transparent">
              AstroPass
            </span>
          </Link>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg
                    transition-all duration-300
                    ${isActive 
                      ? "bg-primary/20 text-primary shadow-glow-blue" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
