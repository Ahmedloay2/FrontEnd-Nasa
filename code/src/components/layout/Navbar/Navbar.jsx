import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: "fas fa-home" },
    { path: "/nbl-game", label: "NBL Training", icon: "fas fa-rocket" },
    { path: "/cupola-earth", label: "Cupola Earth", icon: "fas fa-globe" },
    { path: "/story", label: "Story", icon: "fas fa-book-open" },
    { path: "/ebook", label: "E-Book", icon: "fas fa-book" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-rocket navbar-brand-icon"></i>
            <span className="navbar-brand-text">
              AstroPass
            </span>
          </Link>
          
          <div className="navbar-nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`navbar-link ${isActive ? 'active' : ''}`}
                >
                  <i className={`${item.icon} navbar-link-icon`}></i>
                  <span className="navbar-link-text">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;