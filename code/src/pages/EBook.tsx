import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Droplets, Eye, Rocket, Globe } from "lucide-react";

const EBook = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-space bg-clip-text text-transparent flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            AstroPass E-Book
          </h1>
          <p className="text-muted-foreground">
            Your guide to astronaut training and Earth observation
          </p>
        </div>

        <Tabs defaultValue="cupola" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="cupola" className="data-[state=active]:bg-primary/20">
              <Eye className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Cupola</span>
            </TabsTrigger>
            <TabsTrigger value="nbl" className="data-[state=active]:bg-primary/20">
              <Droplets className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">NBL</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-primary/20">
              <Rocket className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Training</span>
            </TabsTrigger>
            <TabsTrigger value="earth" className="data-[state=active]:bg-primary/20">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Earth</span>
            </TabsTrigger>
            <TabsTrigger value="benefits" className="data-[state=active]:bg-primary/20">
              <span className="hidden sm:inline">Benefits</span>
              <span className="sm:hidden">💫</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cupola" className="space-y-4">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-primary">What is the Cupola?</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  The Cupola is an observation module on the International Space Station, featuring seven windows 
                  arranged in a distinctive dome shape. It provides astronauts with unparalleled views of Earth and space.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">📐 Dimensions</h3>
                    <p className="text-sm text-muted-foreground">3 meters in diameter with 7 windows</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">🗓️ Installed</h3>
                    <p className="text-sm text-muted-foreground">February 2010</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">🪟 Main Window</h3>
                    <p className="text-sm text-muted-foreground">80cm diameter - largest ever used in space</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">🎯 Purpose</h3>
                    <p className="text-sm text-muted-foreground">Earth observation & robotic arm operations</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="nbl" className="space-y-4">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-primary">Neutral Buoyancy Laboratory</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  The NBL is a massive indoor pool at NASA's Johnson Space Center used to simulate the weightless 
                  environment of space. It's where astronauts practice spacewalks before their missions.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">📏 Size</h3>
                    <p className="text-sm text-muted-foreground">62m long, 31m wide, 12m deep</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">💧 Water Volume</h3>
                    <p className="text-sm text-muted-foreground">23 million liters</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">⚖️ Neutral Buoyancy</h3>
                    <p className="text-sm text-muted-foreground">Achieved by precise weight adjustment</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-bold text-secondary mb-2">👨‍🚀 Training Duration</h3>
                    <p className="text-sm text-muted-foreground">6-7 hours per spacewalk session</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-primary">How Astronauts Train</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  Astronaut training is rigorous and multifaceted, preparing candidates for every aspect of space missions.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      icon: "🏊‍♂️",
                      title: "NBL Underwater Training",
                      desc: "Practice spacewalks in full spacesuits with precise buoyancy control"
                    },
                    {
                      icon: "🎓",
                      title: "Technical Education",
                      desc: "Learn spacecraft systems, robotics, and scientific procedures"
                    },
                    {
                      icon: "💪",
                      title: "Physical Conditioning",
                      desc: "Maintain peak fitness to handle the demands of space"
                    },
                    {
                      icon: "🧘",
                      title: "Mental Preparation",
                      desc: "Develop resilience for isolation and high-stress situations"
                    },
                    {
                      icon: "🤝",
                      title: "Team Training",
                      desc: "Work with international crews and mission control"
                    },
                    {
                      icon: "🌍",
                      title: "Earth Observation",
                      desc: "Study geography, weather patterns, and scientific photography"
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 bg-muted/30 p-4 rounded-lg">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-secondary">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="earth" className="space-y-4">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-primary">Observing Earth from Space</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  From the ISS, astronauts have a unique vantage point to study our planet. Their observations 
                  contribute to climate science, disaster response, and environmental monitoring.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    { icon: "🌀", title: "Weather Systems", desc: "Track hurricanes, storms, and atmospheric patterns" },
                    { icon: "🌳", title: "Deforestation", desc: "Monitor changes in rainforests and vegetation" },
                    { icon: "❄️", title: "Ice Coverage", desc: "Document glacial retreat and polar ice changes" },
                    { icon: "🔥", title: "Wildfires", desc: "Observe fire patterns and smoke distribution" },
                    { icon: "🏙️", title: "Urban Growth", desc: "Study city expansion and light pollution" },
                    { icon: "🌊", title: "Ocean Health", desc: "Track ocean currents, coral reefs, and algae blooms" }
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <h3 className="font-bold text-secondary mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4">
            <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-4 text-primary">Benefits to Humanity</h2>
              <div className="space-y-4 text-foreground">
                <p>
                  Space exploration and Earth observation from the ISS provide crucial benefits that improve life on Earth.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: "🛡️ Disaster Prediction",
                      desc: "Early warning systems for hurricanes, floods, and natural disasters save countless lives"
                    },
                    {
                      title: "🌡️ Climate Monitoring",
                      desc: "Long-term data on temperature, ice coverage, and atmospheric changes guide policy decisions"
                    },
                    {
                      title: "🌾 Agriculture Support",
                      desc: "Satellite data helps optimize crop yields and manage water resources"
                    },
                    {
                      title: "🔬 Scientific Discovery",
                      desc: "Research in microgravity leads to advances in medicine, materials, and technology"
                    },
                    {
                      title: "🌍 Environmental Protection",
                      desc: "Monitoring deforestation, ocean health, and pollution helps preserve ecosystems"
                    },
                    {
                      title: "🚀 Technological Innovation",
                      desc: "Space program developments lead to improvements in everyday technology"
                    },
                    {
                      title: "🤝 International Cooperation",
                      desc: "The ISS demonstrates peaceful collaboration between nations"
                    },
                    {
                      title: "💡 Inspiration",
                      desc: "Space exploration inspires the next generation of scientists and engineers"
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-bold text-secondary mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Card className="p-4 bg-gradient-space/20 border-primary inline-block">
            <p className="text-sm text-muted-foreground">
              🌟 NASA Space Apps Challenge 2025 • Education for Tomorrow
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EBook;
