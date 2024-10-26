import React, { useEffect, useState } from 'react';
import RVCard from '../../components/RVCard/RVCard';
import api from '../../services/api';
import { ERROR_TEXT } from '../../services/constants';
import styles from './Catalog.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCar, faUtensils, faTelevision, faRestroom, faBus } from '@fortawesome/free-solid-svg-icons';

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
        <section className={styles.catalog}>
            <div className={styles.filtersSection}>
                <div className={styles.filters}>
                    <h3>Location</h3>
                    <input
                        type="text"
                        placeholder="Kyiv, Ukraine"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <h3>Filters</h3>
                <div className={styles.filters}>
                    <h4>Vehicle Equipment</h4>
                    <hr className={styles.divider} />
                    <div className={styles.equipmentButtons}>
                        <label className={`${styles.filterButton} ${selectedFilters.AC ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.AC}
                                onChange={() => handleFilterChange('AC')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faSnowflake} />
                            <span>AC</span>
                        </label>
                        <label className={`${styles.filterButton} ${selectedFilters.automatic ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.automatic}
                                onChange={() => handleFilterChange('automatic')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faCar} />
                            <span>Automatic</span>
                        </label>
                        <label className={`${styles.filterButton} ${selectedFilters.kitchen ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.kitchen}
                                onChange={() => handleFilterChange('kitchen')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faUtensils} />
                            <span>Kitchen</span>
                        </label>
                        <label className={`${styles.filterButton} ${selectedFilters.TV ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.TV}
                                onChange={() => handleFilterChange('TV')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faTelevision} />
                            <span>TV</span>
                        </label>
                        <label className={`${styles.filterButton} ${selectedFilters.bathroom ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.bathroom}
                                onChange={() => handleFilterChange('bathroom')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faRestroom} />
                            <span>Bathroom</span>
                        </label>
                    </div>
                </div>

                <div className={styles.vehicleType}>
                    <h4>Vehicle Type</h4>
                    <hr className={styles.divider} />
                    <div className={styles.typeButtons}>
                        <label className={`${styles.filterButton} ${selectedFilters.van ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.van}
                                onChange={() => handleFilterChange('van')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faBus} />
                            <span>Van</span>
                        </label>
                        <label className={`${styles.filterButton} ${selectedFilters.fullyIntegrated ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.fullyIntegrated}
                                onChange={() => handleFilterChange('fullyIntegrated')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faBus} />
                            <span>Fully Integrated</span>
                        </label>
                        <label className={`${styles.filterButton} ${selectedFilters.alcove ? styles.active : ''}`}>
                            <input
                                type="checkbox"
                                checked={selectedFilters.alcove}
                                onChange={() => handleFilterChange('alcove')}
                                style={{ display: 'none' }} // Hide checkbox
                            />
                            <FontAwesomeIcon icon={faBus} />
                            <span>Alcove</span>
                        </label>
                    </div>
                </div>

                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>

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
        </section>
    );
};

export default Catalog;
