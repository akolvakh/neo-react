// Filters.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPendingFilter, setPendingLocation, applyPendingFilters } from '../../redux/vehiclesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCar, faUtensils, faTelevision, faRestroom, faBus } from '@fortawesome/free-solid-svg-icons';
import styles from './Filters.module.css';

const Filters = () => {
    const dispatch = useDispatch();

    const location = useSelector((state) => state.vehicles.pendingFilters?.location || '');
    const selectedFilters = useSelector((state) => state.vehicles.pendingFilters?.selectedFilters || {});

    const handleFilterChange = (filter) => {
        dispatch(setPendingFilter({ filter, value: !selectedFilters[filter] }));
    };
    
    const handleLocationChange = (e) => {
        dispatch(setPendingLocation(e.target.value));
    };

    const handleSearch = () => {
        dispatch(applyPendingFilters());
    };

    return (
        <div className={styles.filtersSection}>
            <div className={styles.filterGroup}>
                <h3>Location</h3>
                <input
                    type="text"
                    placeholder="Kyiv, Ukraine"
                    value={location}
                    onChange={handleLocationChange}
                />
            </div>

            <div className={styles.filterGroup}>
                <h3>Vehicle Equipment</h3>
                <hr className={styles.divider} />
                <div className={styles.equipmentButtons}>
                    <label className={`${styles.filterButton} ${selectedFilters.AC ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.AC}
                            onChange={() => handleFilterChange('AC')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faSnowflake} />
                        <span>AC</span>
                    </label>
                    <label className={`${styles.filterButton} ${selectedFilters.automatic ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.automatic}
                            onChange={() => handleFilterChange('automatic')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faCar} />
                        <span>Automatic</span>
                    </label>
                    <label className={`${styles.filterButton} ${selectedFilters.kitchen ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.kitchen}
                            onChange={() => handleFilterChange('kitchen')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faUtensils} />
                        <span>Kitchen</span>
                    </label>
                    <label className={`${styles.filterButton} ${selectedFilters.TV ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.TV}
                            onChange={() => handleFilterChange('TV')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faTelevision} />
                        <span>TV</span>
                    </label>
                    <label className={`${styles.filterButton} ${selectedFilters.bathroom ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.bathroom}
                            onChange={() => handleFilterChange('bathroom')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faRestroom} />
                        <span>Bathroom</span>
                    </label>
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Vehicle Type</h3>
                <hr className={styles.divider} />
                <div className={styles.typeButtons}>
                    <label className={`${styles.filterButton} ${selectedFilters.van ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.van}
                            onChange={() => handleFilterChange('van')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faBus} />
                        <span>Van</span>
                    </label>
                    <label className={`${styles.filterButton} ${selectedFilters.fullyIntegrated ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.fullyIntegrated}
                            onChange={() => handleFilterChange('fullyIntegrated')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faBus} />
                        <span>Fully Integrated</span>
                    </label>
                    <label className={`${styles.filterButton} ${selectedFilters.alcove ? styles.active : ''}`}>
                        <input
                            type="checkbox"
                            checked={selectedFilters.alcove}
                            onChange={() => handleFilterChange('alcove')}
                            style={{ display: 'none' }}
                        />
                        <FontAwesomeIcon icon={faBus} />
                        <span>Alcove</span>
                    </label>
                </div>
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Filters;
