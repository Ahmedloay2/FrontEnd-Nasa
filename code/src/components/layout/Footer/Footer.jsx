import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <i className="fas fa-rocket footer-brand-icon"></i>
          <span className="footer-brand-text">
            AstroPass
          </span>
        </div>
        
        <p className="footer-description">
          NASA Space Apps Challenge 2025 • Exploring Space Through Technology
        </p>
        
        <div className="footer-social">
          <a href="#" className="footer-social-link">
            <i className="fab fa-github"></i>
          </a>
          <a href="#" className="footer-social-link">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="footer-social-link">
            <i className="fas fa-globe"></i>
          </a>
        </div>
        
        <p className="footer-copyright">
          © 2025 AstroPass Team. Built for NASA Space Apps Challenge.
        </p>
      </div>
    </footer>
  );
};

export default Footer;