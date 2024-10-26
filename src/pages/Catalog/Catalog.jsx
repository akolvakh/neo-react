import React, { useEffect, useState } from 'react';
import RVCard from '../../components/RVCard/RVCard';
import api from '../../services/api';
import { ERROR_TEXT } from '../../services/constants';
import styles from './Catalog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCar, faUtensils, faTelevision, faRestroom, faBus } from '@fortawesome/free-solid-svg-icons';

import Filters from '../../components/Filters/Filters'; // Ensure Filters component is imported


const Catalog = () => {
    const [campers, setCampers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');
    const [visibleCount, setVisibleCount] = useState(5);
    const [filteredCampers, setFilteredCampers] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        AC: false,
        automatic: false,
        kitchen: false,
        TV: false,
        bathroom: false,
        van: false,
        fullyIntegrated: false,
        alcove: false,
    });
    const [location, setLocation] = useState('');

    useEffect(() => {
        const fetchCampers = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await api.fetchCampers();
                if (response && response.items) {
                    setCampers(response.items);
                    setFilteredCampers(response.items);
                } else {
                    throw new Error('No items found in the response');
                }
            } catch (e) {
                console.error('Fetch Error:', e);
                setError(ERROR_TEXT);
            } finally {
                setLoading(false);
            }
        };

        fetchCampers();
    }, []);

    const handleFilterChange = (filter) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filter]: !prev[filter],
        }));
    };

    const handleSearch = () => {
        let results = campers;

        if (location) {
            results = results.filter(rv =>
                rv.location && rv.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        const selectedEquipment = Object.keys(selectedFilters).filter(key =>
            key !== 'van' && key !== 'fullyIntegrated' && key !== 'alcove' && selectedFilters[key]
        );

        if (selectedEquipment.length > 0) {
            results = results.filter(rv => {
                return selectedEquipment.every(filter => rv[filter] === true);
            });
        }

        const selectedTypes = Object.keys(selectedFilters).filter(key =>
            (key === 'van' || key === 'fullyIntegrated' || key === 'alcove') && selectedFilters[key]
        );

        if (selectedTypes.length > 0) {
            results = results.filter(rv => selectedTypes.includes(rv.form));
        }

        setFilteredCampers(results.length > 0 ? results : []);
        setVisibleCount(5);
        console.log("Filtered Results:", results);
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 5);
            setLoadingMore(false);
        }, 1000);
    };

 

    const displayedCampers = filteredCampers.length > 0 ? filteredCampers : campers;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className={styles.container}>
            <div className={styles.catalog}>
            <Filters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            handleFilterChange={handleFilterChange} // Ensure this is passed correctly
            location={location}
            setLocation={setLocation}
            handleSearch={handleSearch} // Ensure this is passed correctly
            />
<div className={styles.rvCardsSection}>
{displayedCampers.slice(0, visibleCount).map((rv) => (
    <RVCard key={rv.id} rv={rv} />
))}
{loadingMore ? (
    <div className={styles.loadingText}>Loading...</div>
) : (
    visibleCount < campers.length && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
            Load more
        </button>
    )
)}
</div>
            </div>
        </section>
    );
};

export default Catalog;


