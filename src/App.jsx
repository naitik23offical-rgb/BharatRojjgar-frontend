import React, { useState, useEffect } from 'react'
import WebsiteHome from './pages/WebsiteHome'
import SignUp from './pages/SignUp'
import AboutUs from './pages/AboutUs'
import UserProfile from './pages/UserProfile'
import UpdateProfile from './pages/UpdateProfile'
import FindJobs from './pages/FindJobs'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.substring(1);
    return path || 'home';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      setCurrentPage(path || 'home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page) => {
    if (page !== currentPage) {
      window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
      setCurrentPage(page);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
          const data = await response.json();
          setUserLocation({
            lat: latitude,
            lon: longitude,
            city: data.city || data.locality || 'Unknown Location'
          });
        } catch (error) {
          console.error("Error fetching city:", error);
          setUserLocation({ lat: latitude, lon: longitude, city: 'Detected Location' });
        }
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please ensure location permissions are granted.");
        setIsLocating(false);
      }
    );
  };

  const pageProps = {
    onNavigate: navigate,
    searchQuery: searchQuery,
    onSearch: handleSearch,
    userLocation: userLocation,
    isLocating: isLocating,
    detectLocation: detectLocation
  };

  return (
    <div className="app-container">
      {currentPage === 'home' && <WebsiteHome {...pageProps} />}
      {currentPage === 'signup' && <SignUp {...pageProps} />}
      {currentPage === 'about' && <AboutUs {...pageProps} />}
      {currentPage === 'profile' && <UserProfile {...pageProps} />}
      {currentPage === 'edit-profile' && <UpdateProfile {...pageProps} />}
      {currentPage === 'find-jobs' && <FindJobs {...pageProps} />}
    </div>
  )
}

export default App
