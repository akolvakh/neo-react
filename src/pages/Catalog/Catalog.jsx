// Catalog.jsx
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles, incrementVisibleCount } from '../../redux/vehiclesSlice';
import React, { useEffect } from 'react';

import RVCard from '../../components/RVCard/RVCard';
import styles from './Catalog.module.css';

import Filters from '../../components/Filters/Filters';

const Catalog = () => {
    const dispatch = useDispatch();
    const filteredCampers = useSelector((state) => state.vehicles.filteredVehicles);
    const loading = useSelector((state) => state.vehicles.loading);
    const error = useSelector((state) => state.vehicles.error);
    const visibleCount = useSelector((state) => state.vehicles.visibleCount);

    useEffect(() => {
        dispatch(fetchVehicles()); // Fetch all vehicles on initial load
    }, [dispatch]);

    const handleLoadMore = () => {
        dispatch(incrementVisibleCount());
    };

    const displayedCampers = filteredCampers.slice(0, visibleCount);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className={styles.container}>
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
