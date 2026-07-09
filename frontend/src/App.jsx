import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ViewerPage from './pages/ViewerPage';
import { useAnatomyStore } from './store/useAnatomyStore';
import { getHealth, getLayers, getBodyParts, getPoses } from './services/api';
import { FiMonitor } from 'react-icons/fi';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const { setLayers, setBodyParts, setPoses, setIsLoading, theme } = useAnatomyStore();

  // Screen size detector
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch initial API configurations
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setIsLoading(true);
        // Call backend API or fall back automatically
        const [layersData, bodyPartsData, posesData] = await Promise.all([
          getLayers(),
          getBodyParts(),
          getPoses()
        ]);
        
        setLayers(layersData);
        setBodyParts(bodyPartsData);
        setPoses(posesData);
      } catch (err) {
        console.error('Failed to load initial anatomy configurations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, [setLayers, setBodyParts, setPoses, setIsLoading]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-dark-bg flex flex-col items-center justify-center p-6 text-center z-50 transition-colors duration-300">
        <div className="p-4 bg-medical-50 dark:bg-dark-panel rounded-full text-medical-500 mb-6 animate-bounce">
          <FiMonitor size={36} />
        </div>
        <h1 className="text-2xl font-bold text-medical-900 dark:text-dark-text mb-2">
          Desktop Experience Recommended
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm">
          The Interactive Human Anatomy Viewer requires a larger screen size and graphics capability. For the best 3D performance and interface layout, please use a desktop or tablet.
        </p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/viewer" element={<ViewerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
