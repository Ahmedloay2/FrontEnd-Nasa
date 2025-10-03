import { Link } from "react-router-dom";import { Link } from "react-router-dom";import { Link } from "react-router-dom";import { Link } from "react-router-dom";import { Link } from "react-router-dom";

import "./FeatureCard.css";

import "./FeatureCard.css";

const FeatureCard = ({ title, description, icon, path, delay = 0 }) => {

  return (import "./FeatureCard.css";

    <Link to={path} className="feature-card-link">

      <div const FeatureCard = ({ title, description, icon, path, delay = 0 }) => {

        className="feature-card"

        style={{ animationDelay: `${delay}ms` }}  return (import "./FeatureCard.css";import "./FeatureCard.css";

      >

        <div className="feature-card-icon">    <Link to={path} className="feature-card-link">

          <i className={icon}></i>

        </div>      <div const FeatureCard = ({ title, description, icon, path, delay = 0 }) => {

        <h3 className="feature-card-title">{title}</h3>

        <p className="feature-card-description">{description}</p>        className="feature-card"

        <div className="feature-card-action">

          <span>Explore</span>        style={{ animationDelay: `${delay}ms` }}  return (

          <i className="fas fa-arrow-right"></i>

        </div>      >

      </div>

    </Link>        <div className="feature-card-icon">    <Link to={path} className="feature-card-link">

  );

};          <i className={icon}></i>



export default FeatureCard;        </div>      <div const FeatureCard = ({ title, description, icon, path, delay = 0 }) => {const FeatureCard = ({ title, description, icon, path, delay = 0 }) => {

        <h3 className="feature-card-title">{title}</h3>

        <p className="feature-card-description">{description}</p>        className="feature-card"

        <div className="feature-card-action">

          <span>Explore</span>        style={{ animationDelay: `${delay}ms` }}  return (  return (

          <i className="fas fa-arrow-right"></i>

        </div>      >

      </div>

    </Link>        <div className="feature-card-icon">    <Link to={path} className="feature-card-link">    <Link to={path} className="feature-card-link">

  );

};          <i className={icon}></i>



export default FeatureCard;        </div>      <div       <div 

        <h3 className="feature-card-title">{title}</h3>

        <p className="feature-card-description">{description}</p>        className="feature-card"        className="feature-card"

        <div className="feature-card-action">

          <span>Explore</span>        style={{ animationDelay: `${delay}ms` }}        style={{ animationDelay: `${delay}ms` }}

          <i className="fas fa-arrow-right"></i>

        </div>      >      >

      </div>

    </Link>        <div className="feature-card-icon">        <div className="feature-card-icon">

  );

};          <i className={icon}></i>          <i className={icon}></i>



export default FeatureCard;        </div>        </div>

        <h3 className="feature-card-title">{title}</h3>        <h3 className="feature-card-title">{title}</h3>

        <p className="feature-card-description">{description}</p>        <p className="feature-card-description">{description}</p>

        <div className="feature-card-action">        <div className="feature-card-action">

          <span>Explore</span>          <span>Explore</span>

          <i className="fas fa-arrow-right"></i>          <i className="fas fa-arrow-right"></i>

        </div>        </div>

      </div>      </div>

    </Link>    </Link>

  );  );

};};

          const border = e.currentTarget.querySelector('.animated-border');

export default FeatureCard;          if (iconDiv) {
            iconDiv.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
            iconDiv.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
          }
          if (title) {
            title.style.color = '#3b82f6';
          }
          if (border) {
            border.style.opacity = '1';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
          const iconDiv = e.currentTarget.querySelector('.icon-container');
          const title = e.currentTarget.querySelector('.card-title');
          const border = e.currentTarget.querySelector('.animated-border');
          if (iconDiv) {
            iconDiv.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            iconDiv.style.boxShadow = 'none';
          }
          if (title) {
            title.style.color = '#e2e8f0';
          }
          if (border) {
            border.style.opacity = '0';
          }
        }}
      >
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem'
        }}>
          <div 
            className="icon-container"
            style={{
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            <i className={icon} style={{
              fontSize: '2rem',
              color: '#3b82f6'
            }}></i>
          </div>
          
          <h3 
            className="card-title"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#e2e8f0',
              transition: 'color 0.3s ease',
              margin: 0
            }}
          >
            {title}
          </h3>
          
          <p style={{
            color: '#94a3b8',
            margin: 0,
            lineHeight: '1.6'
          }}>
            {description}
          </p>
        </div>
        
        {/* Animated border effect */}
        <div 
          className="animated-border"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.75rem',
            opacity: 0,
            transition: 'opacity 0.5s ease'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '0.75rem',
            border: '2px solid rgba(59, 130, 246, 0.5)',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;