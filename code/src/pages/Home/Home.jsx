import React, { memo, useMemo } from "react";
import FeatureCard from "../../components/ui/FeatureCard/FeatureCard";
import "./Home.css";

const FEATURES_DATA = [
  {
    title: "NBL Training",
    description: "Experience weightlessness simulation in the Neutral Buoyancy Laboratory. Train like a real astronaut!",
    icon: "fas fa-rocket",
    path: "/nbl-game",
    ariaLabel: "Start NBL Training simulation"
  },
  {
    title: "Cupola Earth",
    description: "Observe Earth from the ISS Cupola window. Zoom into continents and discover NASA's Earth observations.",
    icon: "fas fa-globe",
    path: "/cupola-earth",
    ariaLabel: "Explore Earth from the ISS Cupola"
  },
  {
    title: "Astronaut Story",
    description: "Immerse yourself in a first-person astronaut journey through training and space exploration.",
    icon: "fas fa-book-open",
    path: "/story",
    ariaLabel: "Read astronaut stories"
  },
  {
    title: "E-Book",
    description: "Learn about the Cupola, NBL training, and how astronauts observe Earth for humanity's benefit.",
    icon: "fas fa-book",
    path: "/ebook",
    ariaLabel: "Read the educational e-book"
  },
];

const Home = memo(() => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const featuresWithDelay = useMemo(() => 
    FEATURES_DATA.map((feature, index) => ({
      ...feature,
      delay: index * 100
    })), []
  );

  return (
    <div className="home-container">
      <header className="home-hero">
        <h1 className="home-title">
          Welcome to AstroPass
        </h1>
        <p className="home-subtitle">
          Your gateway to astronaut training and Earth observation from the International Space Station
        </p>
      </header>

      <main className="home-features" role="main">
        <h2 className="visually-hidden">Available Experiences</h2>
        {featuresWithDelay.map((feature) => (
          <FeatureCard
            key={feature.path}
            {...feature}
          />
        ))}
      </main>

      <section className="home-welcome">
        <h2 className="home-welcome-title">Mission Ready</h2>
        <p className="home-welcome-text">
          NASA Space Apps Challenge {currentYear} • Exploring Space Through Technology
        </p>
      </section>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;