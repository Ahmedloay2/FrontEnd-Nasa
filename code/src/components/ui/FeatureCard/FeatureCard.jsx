import { Link } from "react-router-dom";
import "./FeatureCard.css";

const FeatureCard = ({ title, description, icon, path, delay = 0 }) => {
  return (
    <Link to={path} className="feature-card-link">
      <div className="feature-card" style={{ animationDelay: `${delay}ms` }}>
        <div className="feature-card-icon">
          <i className={icon}></i>
        </div>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-description">{description}</p>
        <div className="feature-card-action">
          <span>Explore</span>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
