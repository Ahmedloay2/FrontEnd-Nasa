import React, { memo } from 'react';
import './Footer.css';

const SOCIAL_LINKS = [
  { 
    href: "https://github.com/Ahmedloay2/Passengers", 
    icon: "fab fa-github", 
    label: "GitHub"
  },
  { 
    href: "https://github.com/Ahmedloay2/Passengers", 
    icon: "fab fa-twitter", 
    label: "Twitter"
  },
  { 
    href: "https://github.com/Ahmedloay2/Passengers", 
    icon: "fas fa-globe", 
    label: "NASA Official Website"
  }
];

const SocialLink = memo(({ href, icon, label }) => (
  <a 
    href={href}
    className="footer-social-link"
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className={icon} aria-hidden="true"></i>
  </a>
));

SocialLink.displayName = 'SocialLink';

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-brand">
          <i className="fas fa-rocket footer-brand-icon" aria-hidden="true"></i>
          <span className="footer-brand-text">
            AstroPass
          </span>
        </div>
        
        <p className="footer-description">
          NASA Space Apps Challenge {currentYear} • Exploring Space Through Technology
        </p>
        
        <div className="footer-social" role="list">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink
              key={link.label}
              href={link.href}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </div>
        
        <p className="footer-copyright">
          © {currentYear} AstroPass Team. Built for NASA Space Apps Challenge.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;