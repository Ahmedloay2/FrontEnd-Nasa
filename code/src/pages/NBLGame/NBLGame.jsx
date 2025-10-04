import { useState, useMemo, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import "./NBLGame.css"
import Game from "./Game/Game"

// Memoized Feature Card Component
const FeatureCard = memo(({ feature }) => (
  <div className="nbl-feature">
    <i 
      className={`${feature.icon} nbl-feature-icon`} 
      aria-hidden="true"
    ></i>
    <h3 className="nbl-feature-title">{feature.title}</h3>
    <p className="nbl-feature-description">{feature.description}</p>
  </div>
))

FeatureCard.displayName = 'FeatureCard'
FeatureCard.propTypes = {
  feature: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
}

// Memoized Features Grid Component
const FeaturesGrid = memo(({ features }) => (
  <div className="nbl-features" role="list">
    {features.map((feature) => (
      <div key={feature.title} role="listitem">
        <FeatureCard feature={feature} />
      </div>
    ))}
  </div>
))

FeaturesGrid.displayName = 'FeaturesGrid'
FeaturesGrid.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired
}

// Memoized Welcome Screen Component
const WelcomeScreen = memo(({ features, onStartGame }) => (
  <main className="nbl-container">
    <div className="nbl-content">
      <i className="fas fa-rocket nbl-icon" aria-hidden="true"></i>
      <h1 className="nbl-title">NBL Training</h1>
      <p className="nbl-description">
        Experience the Neutral Buoyancy Laboratory where astronauts train for spacewalks. 
        This underwater facility simulates the weightless environment of space, allowing 
        astronauts to practice complex procedures before their missions.
      </p>
      
      <section aria-labelledby="features-heading">
        <h2 id="features-heading" className="visually-hidden">Training Features</h2>
        <FeaturesGrid features={features} />
      </section>
      
      <button 
        className="nbl-start-game-btn"
        onClick={onStartGame}
        type="button"
        aria-describedby="game-description"
      >
        <i className="fas fa-play" aria-hidden="true"></i>
        Start NBL Training Simulation
      </button>
      <p id="game-description" className="visually-hidden">
        Begin interactive astronaut training simulation
      </p>
    </div>
  </main>
))

WelcomeScreen.displayName = 'WelcomeScreen'
WelcomeScreen.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  onStartGame: PropTypes.func.isRequired
}

const NBLGame = memo(() => {
  const [showGame, setShowGame] = useState(false)

  const features = useMemo(() => [
    {
      icon: "fas fa-swimmer",
      title: "Underwater Training",
      description: "Experience weightlessness simulation in water"
    },
    {
      icon: "fas fa-satellite",
      title: "EVA Practice", 
      description: "Practice spacewalk procedures safely"
    },
    {
      icon: "fas fa-tools",
      title: "Equipment Handling",
      description: "Learn to operate space tools and equipment"
    },
    {
      icon: "fas fa-users",
      title: "Team Coordination",
      description: "Work with mission specialists"
    }
  ], [])

  const handleStartGame = useCallback(() => {
    setShowGame(true)
  }, [])

  if (showGame) {
    return <Game />
  }

  return (
    <div className="nbl-container">
      <div className="nbl-content">
        <i className="fas fa-rocket nbl-icon"></i>
        <h1 className="nbl-title">NBL Training</h1>
        <p className="nbl-description">
          Experience the Neutral Buoyancy Laboratory where astronauts train for spacewalks. 
          This underwater facility simulates the weightless environment of space, allowing 
          astronauts to practice complex procedures before their missions.
        </p>
        <div className="nbl-features">
          {features.map((feature, index) => (
            <div key={index} className="nbl-feature">
              <i className={`${feature.icon} nbl-feature-icon`}></i>
              <h3 className="nbl-feature-title">{feature.title}</h3>
              <p className="nbl-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* How to Play Section */}
        <div className="nbl-howto-section">
          <h2 className="nbl-howto-title">How to Play</h2>
          <ul className="nbl-howto-list">
            <li>
              Use arrow keys or
              <span className="nbl-key-group">
                <span className="nbl-key">W</span>
                <span className="nbl-key">A</span>
                <span className="nbl-key">S</span>
                <span className="nbl-key">D</span>
              </span>
              to swim around the pool.
            </li>
            <li>Press SPACE to collect objects near you.</li>
            <li>Stay inside the green circle (Neutral Buoyancy Zone) to avoid losing attempts.</li>
            <li>Collect as many target objects as possible before time runs out.</li>
            <li>Watch your mass and depth on the HUD for best results.</li>
          </ul>
        </div>
      </div>
      <div className="nbl-game-container">
        <iframe
          src="/Game/index.html"
          title="NBL Training Game"
          className="nbl-game-iframe"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      
    </div>
  );
};
    <WelcomeScreen 
      features={features} 
      onStartGame={handleStartGame}
    />
  )
})

NBLGame.displayName = 'NBLGame'

export default NBLGame