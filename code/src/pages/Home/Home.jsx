// export default Home;
import FeatureCard from "../../components/ui/FeatureCard/FeatureCard";
import Devolopers from "../../components/Devolopers/Devolopers";
import "./Home.css";
import nblImg from "../../assets/jsc2007e079840~medium.jpg";
import cupolaImg from "../../assets/iss038e013587~medium.png";
import astronautImg from "../../assets/83d3223aecd09fc9357c2560b8c1aa07.png";
import eBookImg from "../../assets/9a474b5fd6e5f3ee1f56e103a2256ce1.png" 

const Home = () => {
  const features = [
    {
      title: "NBL Training",
      description:
        "Experience true weightlessness as if you’re floating in space—train like an astronaut among the stars!",
      image: nblImg,
      path: "/nbl-game",
    },
    {
      title: "Cupola Earth",
      description:
        "Observe Earth from the ISS Cupola window. Zoom into continents and discover NASA's Earth observations.",
      image: cupolaImg,
      path: "/cupola-earth",
    },
    {
      title: "Astronaut Story",
      description:
        "Immerse yourself in a first-person astronaut journey where every choice matters—life in space depends on the decisions you make.",
      image: astronautImg,
      path: "/story",
    },
    {
      title: "E-Book",
      description:
        "Learn about the Cupola, NBL training, and how astronauts observe Earth for humanity's benefit.",
      image: eBookImg,
      path: "/ebook",
    },
  ];

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="home-title">Welcome to AstroPass</h1>
        <p className="home-subtitle">
          Your gateway to astronaut training and Earth observation from the
          International Space Station
        </p>
      </header>

      <div className="home-features">
        {features.map((feature, index) => {
          // alternate directions: left → right → down → left ...
          const directions = ["left", "right", "down"];
          const direction = directions[index % directions.length];

          return (
            <FeatureCard
              key={feature.path}
              {...feature}
              delay={index * 150}
              direction={direction}
            />
          );
        })}
      </div>

      <div className="home-mva-section">
        <div className="home-mva-block">
          <h3 className="home-mva-title">Our Mission</h3>
          <p className="home-mva-text">
            To <span className="mva-keyword">inspire</span> and <span className="mva-keyword">educate</span> the next generation of <span className="mva-keyword">explorers</span> by
            simulating astronaut training and sharing the wonders of <span className="mva-keyword">Earth</span> observation from space.
          </p>
        </div>
        <div className="home-mva-block">
          <h3 className="home-mva-title">Our Vision</h3>
          <p className="home-mva-text">
            A world where everyone can experience the <span className="mva-keyword">excitement</span> of <span className="mva-keyword">space</span> exploration and appreciate the <span className="mva-keyword">beauty</span> and <span className="mva-keyword">fragility</span> of our planet.
          </p>
        </div>
        <div className="home-mva-block">
          <h3 className="home-mva-title">Our Approach</h3>
          <p className="home-mva-text">
            We combine <span className="mva-keyword">immersive technology</span>, real <span className="mva-keyword">NASA data</span>, and engaging <span className="mva-keyword">storytelling</span> to make astronaut experiences accessible to all.
          </p>
        </div>
      </div>

      <section className="home-welcome">
        <h2 className="home-welcome-title">Mission Ready</h2>
        <p className="home-welcome-text">
          NASA Space Apps Challenge {currentYear} • Exploring Space Through Technology
        </p>
      </div>

      <Devolopers />
    </div>
  );
});

Home.displayName = 'Home';

export default Home;
