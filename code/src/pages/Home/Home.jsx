import FeatureCard from "../../components/ui/FeatureCard/FeatureCard";
import "./Home.css";

const Home = () => {
  const features = [
    {
      title: "NBL Training",
      description: "Experience weightlessness simulation in the Neutral Buoyancy Laboratory. Train like a real astronaut!",
      icon: "fas fa-rocket",
      path: "/nbl-game",
    },
    {
      title: "Cupola Earth",
      description: "Observe Earth from the ISS Cupola window. Zoom into continents and discover NASA's Earth observations.",
      icon: "fas fa-globe",
      path: "/cupola-earth",
    },
    {
      title: "Astronaut Story",
      description: "Immerse yourself in a first-person astronaut journey through training and space exploration.",
      icon: "fas fa-book-open",
      path: "/story",
    },
    {
      title: "E-Book",
      description: "Learn about the Cupola, NBL training, and how astronauts observe Earth for humanity's benefit.",
      icon: "fas fa-book",
      path: "/ebook",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">
          Welcome to AstroPass
        </h1>
        <p className="home-subtitle">
          Your gateway to astronaut training and Earth observation from the International Space Station
        </p>
      </div>

      <div className="home-features">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.path}
            {...feature}
            delay={index * 100}
          />
        ))}
      </div>

      <div className="home-welcome">
        <h2 className="home-welcome-title">Mission Ready</h2>
        <p className="home-welcome-text">
          NASA Space Apps Challenge 2025 • Exploring Space Through Technology
        </p>
      </div>
    </div>
  );
};

export default Home;