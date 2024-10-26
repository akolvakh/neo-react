// src/components/MainLayout/MainLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Set loading to true on location change

    // Mock loading time or complete when route changes
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, [location]);

  return (
    <div>
      {isLoading && <Loader />} {/* Display loader only if isLoading is true */}
      <Outlet /> {/* Renders child components */}
    </div>
  );
};

export default MainLayout;
