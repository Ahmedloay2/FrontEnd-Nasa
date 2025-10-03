import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const suggestions = [
    { path: '/', label: 'Home - Start your space journey' },
    { path: '/nbl-game', label: 'NBL Training - Astronaut simulation' },
    { path: '/cupola-earth', label: 'Cupola Earth - Earth observation' },
    { path: '/story', label: 'Astronaut Story - Space adventures' },
    { path: '/ebook', label: 'E-Book - Learn about space' }
  ];

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <i className="fas fa-space-shuttle notfound-icon"></i>
        <h1 className="notfound-title">404 - Lost in Space</h1>
        <h2 className="notfound-subtitle">Houston, we have a problem!</h2>
        <p className="notfound-description">
          The page you're looking for has drifted into the void of cyberspace. 
          Don't worry, our mission control can help you navigate back to safety.
        </p>
        
        <div className="notfound-actions">
          <Link to="/" className="notfound-button">
            <i className="fas fa-home"></i>
            Return to Mission Control
          </Link>
        </div>

        <div className="notfound-suggestions">
          <h3 className="notfound-suggestions-title">Explore These Missions:</h3>
          <ul className="notfound-suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="notfound-suggestions-item">
                <Link to={suggestion.path} className="notfound-suggestions-link">
                  {suggestion.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;