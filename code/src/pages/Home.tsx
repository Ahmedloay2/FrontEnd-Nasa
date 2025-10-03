import { Rocket, Globe, BookOpen, Book } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";

const Home = () => {
  const features = [
    {
      title: "NBL Training",
      description: "Experience weightlessness simulation in the Neutral Buoyancy Laboratory. Train like a real astronaut!",
      icon: Rocket,
      path: "/nbl-game",
    },
    {
      title: "Cupola Earth",
      description: "Observe Earth from the ISS Cupola window. Zoom into continents and discover NASA's Earth observations.",
      icon: Globe,
      path: "/cupola-earth",
    },
    {
      title: "Astronaut Story",
      description: "Immerse yourself in a first-person astronaut journey through training and space exploration.",
      icon: BookOpen,
      path: "/story",
    },
    {
      title: "E-Book",
      description: "Learn about the Cupola, NBL training, and how astronauts observe Earth for humanity's benefit.",
      icon: Book,
      path: "/ebook",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-space bg-clip-text text-transparent">
            Welcome to AstroPass
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your gateway to astronaut training and Earth observation from the International Space Station
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.path}
              {...feature}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Mission Info */}
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
          <p className="text-sm text-muted-foreground">
            NASA Space Apps Challenge 2025 • Exploring Space Through Technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
