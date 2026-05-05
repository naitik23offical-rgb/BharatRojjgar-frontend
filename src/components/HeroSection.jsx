import React, { useEffect } from 'react';
import { MapPin, Globe } from 'lucide-react';
import './HeroSection.css';

const HeroSection = ({ onNavigate, userLocation, isLocating, detectLocation }) => {
  
  useEffect(() => {
    // Re-initialize Google Translate if the component remounts
    if (window.google && window.google.translate && document.getElementById('google_translate_element')) {
      document.getElementById('google_translate_element').innerHTML = '';
      new window.google.translate.TranslateElement({
        pageLanguage: 'en', 
        includedLanguages: 'en,hi,bn,te,mr,ta,ur,gu,kn,ml,pa,or,as',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }
  }, []);

  return (
    <section className="hero-section">
      <div className="feature-bar container">
        <div 
          className="feature-item" 
          onClick={detectLocation}
          style={{ cursor: 'pointer' }}
          title="Click to detect your location"
        >
          <MapPin className="feature-icon" size={20} />
          <span>{isLocating ? 'Detecting...' : (userLocation ? userLocation.city : 'Location')}</span>
        </div>
        <div 
          className="feature-item translate-widget-container" 
          title="Click to change language"
        >
          <Globe className="feature-icon" size={20} />
          <span>Language</span>
          <div 
            id="google_translate_element" 
            className="google-translate-wrapper"
          ></div>
        </div>
      </div>

      <div className="hero-carousel">
        <div className="carousel-image-container">
          <img src="/hero-image.png" alt="JCB Backhoe Loader" className="hero-image" />
          <div className="carousel-overlay">
            <h2 className="hero-title animate-fade-in">Find Your Next Job or Hire Skilled Labor</h2>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary cta-btn animate-fade-in" 
                style={{ animationDelay: '0.2s' }}
                onClick={() => onNavigate && onNavigate('find-jobs')}
              >
                Find Jobs
              </button>
              <button 
                className="btn btn-outline cta-btn-outline animate-fade-in" 
                style={{ animationDelay: '0.3s' }}
                onClick={() => onNavigate && onNavigate('signup')}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
