import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles, incrementVisibleCount, resetVisibleCount, setLoadingMore } from '../../redux/vehiclesSlice';
import RVCard from '../../components/RVCard/RVCard';
import Filters from '../../components/Filters/Filters';
import Loader from '../../components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import styles from './Catalog.module.css';

const Catalog = () => {
    const dispatch = useDispatch();
    const filteredCampers = useSelector((state) => state.vehicles.filteredVehicles);
    const loading = useSelector((state) => state.vehicles.loading);
    const loadingMore = useSelector((state) => state.vehicles.loadingMore);
    const error = useSelector((state) => state.vehicles.error);
    const visibleCount = useSelector((state) => state.vehicles.visibleCount);

    useEffect(() => {
        dispatch(fetchVehicles()); // Fetch all vehicles on initial load
        dispatch(resetVisibleCount()); // Reset visible count on component mount
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error); // Show error toast notification if there is an error
        }
    }, [error]);

    const handleLoadMore = () => {
        dispatch(setLoadingMore(true)); // Show loader overlay when loading more
        setTimeout(() => {
            dispatch(incrementVisibleCount());
            dispatch(setLoadingMore(false)); // Hide loader after items are loaded
        }, 500); // Simulate network delay
    };

    const displayedCampers = filteredCampers.slice(0, visibleCount);

    return (
        <section className={styles.container}>
            <Toaster position="top-right" reverseOrder={false} />
            {loading && <Loader />} {/* Show loader only for initial loading */}
            {loadingMore && <Loader />} {/* Show overlay loader when loading more items */}
            <div className={styles.catalog}>
                <Filters />
                <div className={styles.rvCardsSection}>
                    {displayedCampers.map((rv) => (
                        <RVCard key={rv.id} rv={rv} />
                    ))}
                    {visibleCount < filteredCampers.length && (
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
