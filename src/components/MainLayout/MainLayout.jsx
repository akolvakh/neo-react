import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      {isLoading && <Loader />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
