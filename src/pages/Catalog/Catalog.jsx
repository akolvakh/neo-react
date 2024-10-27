import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVehicles,
  incrementVisibleCount,
  setLoadingMore,
  clearFilters,
} from "../../redux/vehiclesSlice";
import RVCard from "../../components/RVCard/RVCard";
import Filters from "../../components/Filters/Filters";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import styles from "./Catalog.module.css";

const Catalog = () => {
  const dispatch = useDispatch();
  const filteredCampers = useSelector(
    (state) => state.vehicles.filteredVehicles
  );
  const loading = useSelector((state) => state.vehicles.loading);
  const loadingMore = useSelector((state) => state.vehicles.loadingMore);
  const error = useSelector((state) => state.vehicles.error);
  const visibleCount = useSelector((state) => state.vehicles.visibleCount);

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(clearFilters());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    console.log("Filtered Campers:", filteredCampers.length);
  }, [filteredCampers]);

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Loading More:", loadingMore);
    console.log("Visible Count:", visibleCount);
    console.log("Filtered Campers Length:", filteredCampers.length);
  }, [loading, loadingMore, visibleCount, filteredCampers]);

  useEffect(() => {
    if (!loading) {
      console.log("Final Filtered Campers:", filteredCampers);
      console.log("Final Visible Count:", visibleCount);
    }
  }, [loading, filteredCampers, visibleCount]);

  const handleLoadMore = () => {
    dispatch(setLoadingMore(true));
    setTimeout(() => {
      dispatch(incrementVisibleCount());
      dispatch(setLoadingMore(false));
    }, 500);
  };

  const displayedCampers = filteredCampers.slice(0, visibleCount);

  return (
    <section className={styles.container}>
      <Toaster position="top-right" reverseOrder={false} />

      {loading && <Loader />}
      {loadingMore && <Loader />}

      <div className={styles.catalog}>
        <Filters />
        <div className={styles.rvCardsSection}>
          {displayedCampers.map((rv) => (
            <RVCard key={rv.id} rv={rv} />
          ))}

          {!loading && visibleCount < filteredCampers.length && (
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load more
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
