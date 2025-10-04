import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NAVIGATION_SUGGESTIONS = [
  { path: '/', label: 'Home - Start your space journey', icon: 'fas fa-home' },
  { path: '/nbl-game', label: 'NBL Training - Astronaut simulation', icon: 'fas fa-rocket' },
  { path: '/cupola-earth', label: 'Cupola Earth - Earth observation', icon: 'fas fa-globe' },
  { path: '/story', label: 'Astronaut Story - Space adventures', icon: 'fas fa-book-open' },
  { path: '/ebook', label: 'E-Book - Learn about space', icon: 'fas fa-book' }
];

const SuggestionLink = memo(({ suggestion }) => (
  <li className="notfound-suggestions-item">
    <Link 
      to={suggestion.path} 
      className="notfound-suggestions-link"
      aria-label={suggestion.label}
    >
      <i className={suggestion.icon} aria-hidden="true"></i>
      {suggestion.label}
    </Link>
  </li>
));

SuggestionLink.displayName = 'SuggestionLink';

const NotFound = memo(() => {
  const suggestionsList = useMemo(() => 
    NAVIGATION_SUGGESTIONS.map((suggestion) => (
      <SuggestionLink key={suggestion.path} suggestion={suggestion} />
    )), []
  );

  return (
    <div className="notfound-container" role="main">
      <div className="notfound-content">
        <i className="fas fa-space-shuttle notfound-icon" aria-hidden="true"></i>
        <h1 className="notfound-title">404 - Lost in Space</h1>
        <h2 className="notfound-subtitle">Houston, we have a problem!</h2>
        <p className="notfound-description">
          The page you're looking for has drifted into the void of cyberspace. 
          Don't worry, our mission control can help you navigate back to safety.
        </p>
        
        <div className="notfound-actions">
          <Link 
            to="/" 
            className="notfound-button"
            aria-label="Return to home page"
          >
            <i className="fas fa-home" aria-hidden="true"></i>
            Return to Mission Control
          </Link>
        </div>

        <nav className="notfound-suggestions" aria-label="Alternative navigation">
          <h3 className="notfound-suggestions-title">Explore These Missions:</h3>
          <ul className="notfound-suggestions-list" role="list">
            {suggestionsList}
          </ul>
        </nav>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';

export default NotFound;