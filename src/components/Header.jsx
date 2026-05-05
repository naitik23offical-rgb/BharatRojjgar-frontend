import React, { useState } from 'react';
import { Home, User, Info, Search, X, Menu } from 'lucide-react';
import './Header.css';

const Header = ({ onNavigate, searchQuery, onSearch }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const navigateAndClose = (page) => {
    if (onNavigate) onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="top-bar"></div>
      <header className="main-header">
        <div className="container header-content relative-container">
          
          {/* Expanded Mobile Search Overlay */}
          {isMobileSearchOpen && (
            <div className="mobile-search-overlay">
              <div className="mobile-search-overlay-container">
                <Search className="search-icon-inside" size={18} />
                <input 
                  autoFocus 
                  type="text" 
                  placeholder="Search workers, JCB, Crane..." 
                  className="search-input"
                  value={searchQuery || ''}
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsMobileSearchOpen(false);
                      if (onNavigate) onNavigate('find-jobs');
                    }
                  }}
                />
              </div>
              <button className="mobile-action-btn" onClick={() => setIsMobileSearchOpen(false)}>
                <X size={24} />
              </button>
            </div>
          )}

          <div className="logo-section">
            <img src="/logo.png" alt="Bharat Rojjgar Logo" className="header-logo-img" />
          </div>

          <div className="search-bar desktop-only">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search workers..." 
              className="search-input" 
              value={searchQuery || ''}
              onChange={(e) => onSearch && onSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && onNavigate) {
                  onNavigate('find-jobs');
                }
              }}
            />
          </div>

          <nav className="nav-links desktop-only">
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigateAndClose('home'); }}>
              <Home size={20} />
              <span>Home</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigateAndClose('profile'); }}>
              <User size={20} />
              <span>Profile</span>
            </a>
            <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigateAndClose('about'); }}>
              <Info size={20} />
              <span>About Us</span>
            </a>
          </nav>

          <div className="header-right-actions">
            <div className="auth-section desktop-only">
              {isLoggedIn ? (
                <button className="btn btn-outline login-btn" onClick={handleLogout}>Log Out</button>
              ) : (
                <button className="btn btn-accent login-btn" onClick={() => navigateAndClose('signup')}>Sign Up / Log In</button>
              )}
            </div>

            <button className="mobile-action-btn search-btn-mobile mobile-only" onClick={() => setIsMobileSearchOpen(true)}>
              <Search size={22} />
            </button>

            <button className="mobile-action-btn menu-btn-mobile mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <img src="/logo.png" alt="Bharat Rojjgar Logo" className="header-logo-img" />
          <button className="close-drawer-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="drawer-nav-links">
          <a href="#" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); navigateAndClose('home'); }}>
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); navigateAndClose('profile'); }}>
            <User size={20} />
            <span>Profile</span>
          </a>
          <a href="#" className="drawer-nav-item" onClick={(e) => { e.preventDefault(); navigateAndClose('about'); }}>
            <Info size={20} />
            <span>About Us</span>
          </a>
          
          <div className="drawer-auth-section">
             {isLoggedIn ? (
                <button className="btn btn-outline full-width-btn" onClick={handleLogout}>Log Out</button>
              ) : (
                <button className="btn btn-accent full-width-btn" onClick={() => navigateAndClose('signup')}>Sign Up / Log In</button>
              )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
