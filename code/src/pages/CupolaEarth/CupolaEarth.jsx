import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import './CupolaEarth.css'
import InfiniteMenu from './components/InfiniteMenu'
import Aurora from '../../assets/aurora.jpg'
import Witnessing from '../../assets/Witnessing Nature\'s Power.jpg'
import WorldAtNight from '../../assets/The World at Night.jpg'
import Eclipse from '../../assets/The Shadow of an Eclipse.jpg'
import Stars from '../../assets/Stars Like You\'ve Never Seen.jpg'

// Memoized Tab Button Component
const TabButton = memo(({ tab, activeTab, onTabChange }) => (
  <button
    className={`cupola-earth-nav-button ${activeTab === tab.id ? 'active' : ''}`}
    onClick={() => onTabChange(tab.id)}
    role="tab"
    aria-selected={activeTab === tab.id}
    aria-controls={`${tab.id.toLowerCase()}-panel`}
    type="button"
  >
    {tab.label}
  </button>
))

TabButton.displayName = 'TabButton'
TabButton.propTypes = {
  tab: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
}

// Loading Spinner Component
const LoadingSpinner = memo(() => (
  <div className="spinner-container" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true"></div>
    <p className="visually-hidden">Loading content...</p>
  </div>
))

LoadingSpinner.displayName = 'LoadingSpinner'

// Game Panel Component
const GamePanel = memo(() => {
  const handleLaunchGame = useCallback(() => {
    window.open('/cupola-game', '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div id="game-panel" role="tabpanel" aria-labelledby="game-tab">
      <div className='cupola-earth-content-header'>
        <h2>Cupola Explorer Game</h2>
        <p>Experience Earth observation from the Cupola module on the International Space Station. Click on natural disaster icons as they appear through the cupola window!</p>
      </div>
      
      <div className="game-preview-section">
        <div className="game-description">
          <h3>🛰️ Mission Overview</h3>
          <div className="mission-details">
            <div className="mission-card">
              <h4>🎯 Your Mission</h4>
              <p>As an astronaut aboard the International Space Station, your job is to observe and track natural disasters as they appear through the cupola window. Click fast before they disappear!</p>
            </div>
            
            <div className="mission-card">
              <h4>🎮 Game Features</h4>
              <ul>
                <li>3 levels of increasing difficulty</li>
                <li>Real Earth video background from NASA</li>
                <li>Educational facts about natural disasters</li>
                <li>Sticker collection system</li>
                <li>Immersive space station experience</li>
              </ul>
            </div>
            
            <div className="mission-card">
              <h4>🌍 Learn About</h4>
              <p>Hurricanes, volcanic eruptions, wildfires, flooding, dust storms, earthquakes, and tsunami effects - all from the unique perspective of space!</p>
            </div>
          </div>
          
          <div className="game-launch-section">
            <button 
              className="launch-game-button"
              onClick={handleLaunchGame}
              type="button"
              aria-describedby="launch-note"
            >
              🚀 Launch Full Game Experience
            </button>
            <p id="launch-note" className="launch-note">Opens in a new window for optimal gaming experience</p>
          </div>
        </div>
        
        <div className="game-preview">
          <div className="preview-window">
            <div className="preview-frame">
              <video 
                className="preview-video" 
                autoPlay 
                loop 
                muted 
                playsInline
                aria-label="Earth view from space station preview"
              >
                <source src="/earth2.mp4" type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
              </video>
              <div className="preview-overlay">
                <div className="preview-stats">
                  <div className="stat-item">
                    <span className="stat-label">Mission Status:</span>
                    <span className="stat-value">Ready</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Astronaut Level:</span>
                    <span className="stat-value">Beginner</span>
                  </div>
                </div>
                <div className="preview-cupola-frame" aria-hidden="true"></div>
                <div className="preview-title">🛰️ Cupola Explorer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

GamePanel.displayName = 'GamePanel'

// About Panel Component
const AboutPanel = memo(({ isLoading, aboutItems }) => (
  <div id="about-panel" role="tabpanel" aria-labelledby="about-tab">
    <div className='cupola-earth-content-header'>
      <h2>About Cupola Earth</h2>
      <p>Discover Earth from the unique vantage point of the International Space Station's Cupola module. Explore NASA's Earth observation missions and zoom into continents to see real-time data and stunning imagery captured by astronauts.</p>
    </div>
    
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <InfiniteMenu items={aboutItems} />
    )}
  </div>
))

AboutPanel.displayName = 'AboutPanel'
AboutPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  aboutItems: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired
}

const CupolaEarth = memo(() => {
  const [activeTab, setActiveTab] = useState('Game')
  const [isLoading, setIsLoading] = useState(false)

  const aboutItems = useMemo(() => [
    {
      image: Aurora,
      link: 'https://www.nasa.gov/science-research/heliophysics/auroras/',
      title: 'The Northern & Southern Lights',
      description: 'From space, astronauts don\'t just see the auroras—they fly right through them! They witness vast curtains of green and purple light dancing over the poles.'
    },
    {
      image: Witnessing,
      link: '',
      title: 'Witnessing Nature\'s Power',
      description: 'From the ISS, astronauts can see massive weather patterns forming. They see the swirling arms of hurricanes and the smoke plumes from giant wildfires. Their unique point of view helps scientists and disaster relief teams on the ground.'
    },
    {
      image: WorldAtNight,
      link: 'https://earthobservatory.nasa.gov/features/NightLights',
      title: 'The World at Night',
      description: 'When the sun goes down (which happens 16 times a day on the ISS!), the planet transforms into a sparkling web of light. Cities shine like clusters of stars, and you can see the connections between different parts of the world.'
    },
    {
      image: Eclipse,
      link: 'https://svs.gsfc.nasa.gov/5186',
      title: 'The Shadow of an Eclipse',
      description: 'During a solar eclipse, astronauts can see the Moon\'s shadow moving across the face of the Earth. It\'s a massive, dark circle that brings a moment of twilight to entire regions.'
    },
    {
      image: Stars,
      link: 'https://www.jpl.nasa.gov/edu/resources/teachable-moment/webb-telescope-sees-the-universe-like-weve-never-seen-it-before/',
      title: 'Stars Like You\'ve Never Seen',
      description: 'With no atmosphere to blur the view, the Milky Way is a brilliant, dense river of stars. Astronauts see a universe packed with light and color.'
    }
  ], [])

  const tabs = useMemo(() => [
    { id: 'Game', label: 'The Rotatory Earth Game' },
    { id: 'Discover', label: 'Discover Phenomena From Cupola' }
  ], [])

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId)
  }, [])

  // Show spinner when switching to About tab
  useEffect(() => {
    if (activeTab === 'About') {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [activeTab])

  return (
    <main className="cupola-earth-page">
      <Header />
      <div className='cupola-earth-container'>
        <nav className='cupola-earth-nav' role="tablist" aria-label="Cupola Earth navigation">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          ))}
        </nav>

        <div className='cupola-earth-content'>
          {activeTab === 'Game' && <GamePanel />}
          {activeTab === 'About' && (
            <AboutPanel isLoading={isLoading} aboutItems={aboutItems} />
          )}
        </div>
      </div>
    </main>
  )
})

CupolaEarth.displayName = 'CupolaEarth'

export default CupolaEarth