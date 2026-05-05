import React, { createContext, useState, useEffect, useContext } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/content/all');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        console.error("Failed to fetch dynamic content");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Helper function to get content safely
  const getContent = (section, key, fallback = '') => {
    if (content[section] && content[section][key]) {
      return content[section][key];
    }
    return fallback;
  };

  return (
    <ContentContext.Provider value={{ content, getContent, fetchContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
};
