import React, { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: "fas fa-home", ariaLabel: "Go to home page" },
  { path: "/nbl-game", label: "NBL Training", icon: "fas fa-rocket", ariaLabel: "Go to NBL training game" },
  { path: "/cupola-earth", label: "Cupola Earth", icon: "fas fa-globe", ariaLabel: "Go to Cupola Earth experience" },
  { path: "/story", label: "Story", icon: "fas fa-book-open", ariaLabel: "Go to story section" },
  { path: "/ebook", label: "E-Book", icon: "fas fa-book", ariaLabel: "Go to e-book section" },
];

const NavLink = memo(({ item, isActive }) => (
  <Link
    to={item.path}
    className={`navbar-link ${isActive ? 'active' : ''}`}
    aria-label={item.ariaLabel}
    aria-current={isActive ? 'page' : undefined}
  >
    <i className={`${item.icon} navbar-link-icon`} aria-hidden="true"></i>
    <span className="navbar-link-text">{item.label}</span>
  </Link>
));

NavLink.displayName = 'NavLink';

const Navbar = memo(() => {
  const location = useLocation();
  
  const navigationLinks = useMemo(() => 
    NAV_ITEMS.map((item) => ({
      ...item,
      isActive: location.pathname === item.path
    })), [location.pathname]
  );

  // Check if we're on a game page where navbar shouldn't be sticky
  const isGamePage = useMemo(() => 
    location.pathname === '/nbl-game' || 
    location.pathname === '/cupola-earth' ||
    location.pathname.includes('/game'), 
    [location.pathname]
  );

  return (
    <nav 
      className={`navbar ${isGamePage ? 'navbar-not-sticky' : ''}`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        <div className="navbar-content">
          <Link 
            to="/" 
            className="navbar-brand"
            aria-label="AstroPass - Go to home page"
          >
            <i className="fas fa-rocket navbar-brand-icon" aria-hidden="true"></i>
            <span className="navbar-brand-text">
              AstroPass
            </span>
          </Link>
          
          <div className="navbar-nav" role="menubar">
            {navigationLinks.map((item) => (
              <NavLink
                key={item.path}
                item={item}
                isActive={item.isActive}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;