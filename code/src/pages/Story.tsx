import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const Story = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleSections((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".story-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const storyParts = [
    {
      text: "Your journey begins on Earth, years of preparation culminating in this moment. The training has been intense, pushing your body and mind to their limits.",
      emoji: "🌍",
    },
    {
      text: "You descend into the Neutral Buoyancy Laboratory, a massive pool 40 feet deep. This is where spacewalks are rehearsed, where you learn to move in weightlessness.",
      emoji: "🏊‍♂️",
    },
    {
      text: "Suited up in your training gear, weights carefully balanced, you float suspended in the water. Every movement must be precise, controlled. This is your new reality.",
      emoji: "🧑‍🚀",
    },
    {
      text: "Months later, you float through the airlock of the International Space Station. The real weightlessness is nothing like the pool. It's... magical.",
      emoji: "🚀",
    },
    {
      text: "You make your way to the Cupola, the jewel of the ISS. Seven windows offering an unobstructed view of Earth. You've seen photos, but nothing prepared you for this.",
      emoji: "🪟",
    },
    {
      text: "Earth hangs before you, a blue marble wrapped in swirling white clouds. You can see entire continents, weather systems forming, the thin blue line of our atmosphere.",
      emoji: "🌎",
    },
    {
      text: "You observe a hurricane developing in the Atlantic. From here, you can see the entire system, the power and beauty of nature. Your observations will help save lives.",
      emoji: "🌀",
    },
    {
      text: "The Amazon rainforest stretches out below, a vast green expanse. You document the changes, the encroachment of deforestation. This is why you're here.",
      emoji: "🌳",
    },
    {
      text: "As the station orbits, you witness sixteen sunrises in a single day. Each one reminds you how precious our planet is, how fragile, how worth protecting.",
      emoji: "🌅",
    },
    {
      text: "Your mission is clear: observe, document, and share. Every photograph, every measurement brings us closer to understanding our home and how to preserve it.",
      emoji: "📸",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-space bg-clip-text text-transparent">
            An Astronaut's Journey
          </h1>
          <p className="text-muted-foreground">
            Experience the path from Earth to the stars
          </p>
        </div>

        <div className="space-y-12">
          {storyParts.map((part, index) => (
            <Card
              key={index}
              data-index={index}
              className={`
                story-section p-8 bg-gradient-card backdrop-blur-sm border-primary/20
                transition-all duration-1000 transform
                ${visibleSections.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
                }
              `}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="text-6xl animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                  {part.emoji}
                </div>
                <p className="text-lg leading-relaxed text-foreground">
                  {part.text}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <Card className="p-6 bg-gradient-space/20 border-primary inline-block">
            <p className="text-sm text-muted-foreground italic">
              "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever."
              <br />
              <span className="text-xs">— Konstantin Tsiolkovsky</span>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Story;
