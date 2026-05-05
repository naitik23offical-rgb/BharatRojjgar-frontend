import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';
import './WebsiteHome.css';

const categories = [
  { id: 1, name: 'JCB Operator', icon: '🚜' },
  { id: 2, name: 'Electrician', icon: '⚡' },
  { id: 3, name: 'Plumber', icon: '🔧' },
  { id: 4, name: 'Carpenter', icon: '🔨' },
  { id: 5, name: 'Mason', icon: '🧱' },
  { id: 6, name: 'General Labour', icon: '👷' },
];

const labours = [
  { id: 1, name: 'Rajesh Kumar', category: 'JCB Operator', location: 'Delhi', exp: '5 Yrs' },
  { id: 2, name: 'Suresh Singh', category: 'Electrician', location: 'Mumbai', exp: '3 Yrs' },
  { id: 3, name: 'Amit Patel', category: 'Plumber', location: 'Ahmedabad', exp: '7 Yrs' },
  { id: 4, name: 'Vikram Sharma', category: 'Mason', location: 'Jaipur', exp: '10 Yrs' },
];

const WebsiteHome = ({ onNavigate, searchQuery, onSearch, userLocation, isLocating, detectLocation }) => {
  const { getContent } = useContent();
  return (
    <>
      <Header onNavigate={onNavigate} searchQuery={searchQuery} onSearch={onSearch} />
      <main>
        <HeroSection 
          onNavigate={onNavigate} 
          userLocation={userLocation} 
          isLocating={isLocating} 
          detectLocation={detectLocation} 
        />

        <section className="categories section">
          <div className="container">
            <h2 className="text-center section-title">{getContent('home', 'categoriesTitle', 'Popular Categories')}</h2>
            <div className="categories-grid">
              <div className="category-card" onClick={() => { onSearch('JCB'); onNavigate('find-jobs'); }}>
                <div className="category-image-wrapper">
                  <img src="/images/jcb.png" alt="JCB Operator" className="category-image" />
                </div>
                <h3>{getContent('home', 'cat1Title', 'JCB Operator')}</h3>
                <p>{getContent('home', 'cat1Desc', 'Find experienced JCB operators for your construction needs.')}</p>
              </div>
              <div className="category-card" onClick={() => { onSearch('Crane'); onNavigate('find-jobs'); }}>
                <div className="category-image-wrapper">
                  <img src="/images/crane.png" alt="Crane Operator" className="category-image" />
                </div>
                <h3>{getContent('home', 'cat2Title', 'Crane Operator')}</h3>
                <p>{getContent('home', 'cat2Desc', 'Hire skilled crane operators for heavy lifting and logistics.')}</p>
              </div>
              {categories.slice(1).map(cat => (
                <div key={cat.id} className="category-card" onClick={() => { onSearch(cat.name); onNavigate('find-jobs'); }}>
                  <div className="category-icon-wrapper">{cat.icon}</div>
                  <h3>{cat.name}</h3>
                  <p>Hire reliable {cat.name.toLowerCase()}s in your area.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="how-it-works section bg-light">
          <div className="container">
            <h2 className="text-center section-title">{getContent('home', 'howItWorksTitle', 'How It Works')}</h2>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-num">1</div>
                <h3>{getContent('home', 'step1Title', 'Register')}</h3>
                <p>{getContent('home', 'step1Desc', 'Create your profile as a worker or a contractor easily.')}</p>
              </div>
              <div className="step-card">
                <div className="step-num">2</div>
                <h3>{getContent('home', 'step2Title', 'Search')}</h3>
                <p>{getContent('home', 'step2Desc', 'Find jobs or workers matching your specific location and needs.')}</p>
              </div>
              <div className="step-card">
                <div className="step-num">3</div>
                <h3>{getContent('home', 'step3Title', 'Connect')}</h3>
                <p>{getContent('home', 'step3Desc', 'Contact directly and get the work done efficiently.')}</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer onNavigate={onNavigate} />
    </>
  );
};

export default WebsiteHome;
