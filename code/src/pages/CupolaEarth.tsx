import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn, RotateCcw } from "lucide-react";

interface LocationData {
  name: string;
  fact: string;
  phenomenon: string;
}

const locations: Record<string, LocationData> = {
  "North America": {
    name: "Hurricane Formation - Gulf of Mexico",
    fact: "NASA satellites track hurricane development, helping predict paths and save lives.",
    phenomenon: "Hurricanes",
  },
  "South America": {
    name: "Amazon Rainforest - Brazil",
    fact: "NASA monitors deforestation rates using satellite imagery to protect Earth's lungs.",
    phenomenon: "Deforestation",
  },
  "Europe": {
    name: "Alpine Glaciers - Switzerland",
    fact: "Glacial retreat observed from space shows climate change effects in real-time.",
    phenomenon: "Glacial Retreat",
  },
  "Africa": {
    name: "Sahara Desert - North Africa",
    fact: "NASA tracks dust storms that travel across oceans, affecting global climate patterns.",
    phenomenon: "Dust Storms",
  },
  "Asia": {
    name: "Himalayas - Nepal",
    fact: "The tallest mountains on Earth are monitored for snow coverage and glacial changes.",
    phenomenon: "Snow Coverage",
  },
  "Australia": {
    name: "Great Barrier Reef - Australia",
    fact: "Satellite monitoring helps track coral bleaching and reef health changes.",
    phenomenon: "Coral Bleaching",
  },
};

const CupolaEarth = () => {
  const [zoomLevel, setZoomLevel] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleZoom = (location: string) => {
    if (zoomLevel === 0) {
      setZoomLevel(1);
    } else if (zoomLevel === 1) {
      setZoomLevel(2);
      setSelectedLocation(locations[location]);
    }
  };

  const resetView = () => {
    setZoomLevel(0);
    setSelectedLocation(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-space bg-clip-text text-transparent">
            Cupola Earth Observatory
          </h1>
          <p className="text-muted-foreground">
            View Earth from the International Space Station's observation module
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cupola Window */}
          <div className="lg:col-span-2">
            <Card className="relative overflow-hidden bg-gradient-to-b from-card/80 to-card/60 backdrop-blur-sm border-primary/30">
              {/* Cupola Frame */}
              <div className="relative aspect-video bg-gradient-to-b from-gray-800 to-gray-900 p-8">
                {/* Window frame effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-[20px] border-gray-700 rounded-[50%]" />
                  <div className="absolute inset-8 border-[10px] border-gray-600 rounded-[50%]" />
                </div>

                {/* Earth view */}
                <div className="relative h-full rounded-full overflow-hidden border-4 border-primary/50">
                  {zoomLevel === 0 && (
                    <div className="h-full bg-gradient-to-b from-blue-600 via-blue-500 to-green-600 animate-zoom-in">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl animate-float">🌍</div>
                      </div>
                      <p className="absolute bottom-4 left-0 right-0 text-center text-white font-bold">
                        Click a continent to zoom in
                      </p>
                    </div>
                  )}

                  {zoomLevel === 1 && (
                    <div className="h-full bg-gradient-to-br from-green-700 via-blue-600 to-blue-800 p-6 animate-zoom-in">
                      <div className="grid grid-cols-2 gap-2 h-full">
                        {Object.keys(locations).map((location) => (
                          <button
                            key={location}
                            onClick={() => handleZoom(location)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all hover:scale-105 border border-white/30"
                          >
                            <p className="text-white font-bold text-sm">{location}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {zoomLevel === 2 && selectedLocation && (
                    <div className="h-full bg-gradient-to-br from-blue-900 via-green-800 to-blue-950 p-6 animate-zoom-in flex items-center justify-center">
                      <div className="text-center text-white space-y-4">
                        <h3 className="text-2xl font-bold">{selectedLocation.name}</h3>
                        <div className="text-4xl">📡</div>
                        <p className="text-sm bg-black/30 p-4 rounded-lg">
                          {selectedLocation.fact}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reset button */}
                {zoomLevel > 0 && (
                  <Button
                    onClick={resetView}
                    className="absolute top-4 right-4 z-10"
                    variant="outline"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset View
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary flex items-center gap-2">
                <ZoomIn className="h-5 w-5" />
                Observation Guide
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong>Step 1:</strong> View Earth from the ISS</p>
                <p><strong>Step 2:</strong> Click to zoom into continents</p>
                <p><strong>Step 3:</strong> Select a region to discover NASA observations</p>
              </div>
            </Card>

            {selectedLocation && (
              <Card className="p-6 bg-gradient-space/20 border-primary animate-zoom-in">
                <h3 className="text-lg font-bold mb-3 text-secondary">
                  📊 Phenomenon: {selectedLocation.phenomenon}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedLocation.fact}
                </p>
              </Card>
            )}

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-secondary">About the Cupola</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Cupola is a small module with seven windows, providing breathtaking 360-degree views of Earth and space. 
                Astronauts use it to observe Earth, track weather patterns, and conduct vital scientific research.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CupolaEarth;
