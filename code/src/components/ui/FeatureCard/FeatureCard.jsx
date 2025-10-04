// export default FeatureCard;
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeatureCard.css";

const FeatureCard = ({
  title,
  description,
  image,
  path,
  delay = 0,
  direction = "down",
}) => {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const scrollingDown = window.scrollY > lastScrollY;
      lastScrollY = window.scrollY;
      const inView = rect.top < window.innerHeight - 60 && rect.bottom > 60;

      if (inView && scrollingDown) {
        setVisible(false); // reset to allow re-trigger
        requestAnimationFrame(() => setVisible(true)); // re-trigger animation
      } else if (inView) {
        setVisible(true); // keep visible when scrolling up
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link to={path} className="feature-card-link">
      <div
        ref={cardRef}
        className={`feature-card feature-card-row from-${direction} ${
          visible ? "show" : ""
        }`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Large Image Section */}
        <div className="feature-card-image-section large">
          <div className="feature-card-image-container">
            <img src={image} alt={title} className="feature-card-image-large" />
          </div>
        </div>

        {/* Text Section */}
        <div className="feature-card-text-section">
          <h3 className="feature-card-title">{title}</h3>
          <p className="feature-card-description">{description}</p>
          <div className="feature-card-action">
            <span>Explore</span>
            <i className="fas fa-arrow-right"></i>
          </div>
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
