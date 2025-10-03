import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";

const NBLGame = () => {
  const [weights, setWeights] = useState(5);
  const [isNeutral, setIsNeutral] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const targetWeight = 5; // Perfect neutral buoyancy
  
  const addWeight = () => {
    setWeights(prev => Math.min(prev + 1, 10));
    setIsNeutral(false);
  };

  const removeWeight = () => {
    setWeights(prev => Math.max(prev - 1, 0));
    setIsNeutral(false);
  };

  const checkBuoyancy = () => {
    if (weights === targetWeight) {
      setIsNeutral(true);
      setGameStarted(true);
      toast.success("Perfect! You achieved neutral buoyancy!");
    } else if (weights < targetWeight) {
      toast.error("Too light! You're floating up. Add more weights.");
    } else {
      toast.error("Too heavy! You're sinking. Remove some weights.");
    }
  };

  const completeTask = () => {
    if (isNeutral) {
      setTasksCompleted(prev => prev + 1);
      toast.success(`Task ${tasksCompleted + 1} completed!`);
    } else {
      toast.error("Achieve neutral buoyancy first!");
    }
  };

  const getAstronautPosition = () => {
    if (weights < targetWeight) return "top-10";
    if (weights > targetWeight) return "bottom-10";
    return "top-1/2 -translate-y-1/2";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-space bg-clip-text text-transparent">
            NBL Training Simulator
          </h1>
          <p className="text-muted-foreground">
            Neutral Buoyancy Laboratory - Where astronauts train for spacewalks underwater
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pool Visualization */}
          <Card className="relative h-[500px] bg-gradient-to-b from-blue-900/40 to-blue-950/60 border-primary/30 overflow-hidden">
            <div className="absolute inset-0">
              {/* Water effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-blue-600/20" />
              
              {/* Astronaut */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ${getAstronautPosition()}`}
                style={{ 
                  animation: isNeutral ? "float 3s ease-in-out infinite" : "none" 
                }}
              >
                <div className="text-6xl">🧑‍🚀</div>
              </div>

              {/* Grid lines for depth reference */}
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute left-0 right-0 border-t border-blue-300/20"
                  style={{ top: `${(i + 1) * 20}%` }}
                />
              ))}
            </div>

            {isNeutral && gameStarted && (
              <div className="absolute bottom-4 left-4 right-4">
                <Button 
                  onClick={completeTask}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Complete Training Task ({tasksCompleted}/3)
                </Button>
              </div>
            )}
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">Weight Control</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Weights:</span>
                  <span className="text-2xl font-bold text-foreground">{weights}</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={removeWeight}
                    variant="outline"
                    className="flex-1"
                    disabled={weights === 0}
                  >
                    <Minus className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                  <Button 
                    onClick={addWeight}
                    variant="outline"
                    className="flex-1"
                    disabled={weights === 10}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                <Button 
                  onClick={checkBuoyancy}
                  className="w-full bg-gradient-space hover:opacity-90"
                >
                  Test Buoyancy
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-secondary">Mission Brief</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🎯 <strong>Goal:</strong> Achieve neutral buoyancy (weight = {targetWeight})</p>
                <p>🔧 <strong>Tasks:</strong> Complete 3 training exercises</p>
                <p>💡 <strong>Tip:</strong> Too light? Add weights. Too heavy? Remove weights.</p>
                <p>🌊 <strong>NBL:</strong> A 40-foot deep pool used by NASA for spacewalk training</p>
              </div>
            </Card>

            {tasksCompleted >= 3 && (
              <Card className="p-6 bg-gradient-space/20 border-primary animate-zoom-in">
                <h3 className="text-xl font-bold text-center text-primary">
                  🎉 Training Complete!
                </h3>
                <p className="text-center text-muted-foreground mt-2">
                  You're ready for spacewalk operations!
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NBLGame;
