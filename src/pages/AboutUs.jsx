import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Headphones, User as UserIcon, Building } from 'lucide-react';
import './AboutUs.css';

const AboutUs = ({ onNavigate, searchQuery, onSearch }) => {
  return (
    <div className="app-container">
      <Header onNavigate={onNavigate} searchQuery={searchQuery} onSearch={onSearch} />
      
      <main className="about-main">
        <div className="container">
          
          <div className="about-header-section">
            <h1 className="about-title">About Us</h1>
            <button className="btn btn-outline customer-care-btn">
              <Headphones size={20} />
              Customer Care
            </button>
          </div>

          <div className="about-content glass">
            {/* Director Section */}
            <section className="director-section">
              <div className="director-photo-placeholder">
                <UserIcon size={64} className="director-icon" />
                <span>Director Photo</span>
              </div>
              <div className="director-info">
                <h2>Our Director</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                </p>
              </div>
            </section>

            <hr className="about-divider" />

            {/* Company Section */}
            <section className="company-section">
              <div className="company-info">
                <h2>About Bharat Rojjgar</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
              </div>
              
              {/* Company Photos Placeholders */}
              <div className="company-photos-grid">
                <div className="photo-box">
                  <Building size={32} />
                  <span>Office</span>
                </div>
                <div className="photo-box">
                  <Building size={32} />
                  <span>Team</span>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default AboutUs;
