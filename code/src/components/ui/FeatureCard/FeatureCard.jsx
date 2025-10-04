import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./FeatureCard.css";

const FeatureCard = memo(({ title, description, icon, path, delay = 0, ariaLabel }) => {
  const cardStyle = delay > 0 ? { animationDelay: `${delay}ms` } : undefined;
  
  return (
    <Link 
      to={path} 
      className="feature-card-link"
      aria-label={ariaLabel || `Explore ${title}`}
    >
      <article className="feature-card" style={cardStyle}>
        <div className="feature-card-icon" aria-hidden="true">
          <i className={icon}></i>
        </div>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-description">{description}</p>
        <div className="feature-card-action" aria-hidden="true">
          <span>Explore</span>
          <i className="fas fa-arrow-right"></i>
        </div>
      </article>
    </Link>
  );
});

FeatureCard.displayName = 'FeatureCard';

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  delay: PropTypes.number,
  ariaLabel: PropTypes.string
};

export default FeatureCard;
