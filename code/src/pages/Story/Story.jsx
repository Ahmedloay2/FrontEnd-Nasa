import { useMemo, memo } from "react"
import { Outlet, useLocation } from "react-router-dom"
import PropTypes from 'prop-types'
import ErrorBoundary from "./components/ErrorBoundary"
import "./Story.css"

// Memoized Feature Component
const Feature = memo(({ icon, title, description }) => (
  <div className="feature">
    <span className="feature-icon" aria-hidden="true">{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
))

Feature.displayName = 'Feature'
Feature.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

// Memoized Story Intro Component
const StoryIntro = memo(() => {
  const features = useMemo(() => [
    {
      icon: "🚀",
      title: "Interactive Stories",
      description: "6-part adventures with role selection, challenges, and discoveries"
    },
    {
      icon: "🧠", 
      title: "Smart Quizzes",
      description: "Learn through interactive questions with helpful explanations"
    },
    {
      icon: "🎭",
      title: "Memory Games", 
      description: "Remember special items throughout your space journey"
    },
    {
      icon: "🔊",
      title: "Audio Narration",
      description: "Listen to your story in English or Arabic"
    }
  ], [])

  return (
    <section className="story-intro" aria-labelledby="intro-heading">
      <div className="intro-content">
        <h1 id="intro-heading">🌟 Your Personal Space Adventure Awaits</h1>
        <p>
          Create amazing interactive stories about astronauts, space exploration, and the wonders of the universe. 
          Each story is personalized just for you with quizzes, memory games, and fascinating space facts!
        </p>
        <div className="features-grid" role="list" aria-label="Story features">
          {features.map((feature) => (
            <div key={feature.title} role="listitem">
              <Feature 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

StoryIntro.displayName = 'StoryIntro'

const Story = memo(() => {
  const location = useLocation()
  const isDisplayPage = useMemo(() => 
    location.pathname.includes('/display'), 
    [location.pathname]
  )

  return (
    <ErrorBoundary>
      <main className="story-page">
        {!isDisplayPage && <StoryIntro />}
        
        <div className={`story-content ${isDisplayPage ? 'full-screen' : ''}`}>
          <Outlet />
        </div>
      </main>
    </ErrorBoundary>
  )
})

Story.displayName = 'Story'

export default Story