import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setLocation, fetchVehicles, applyFilters } from '../../redux/vehiclesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSnowflake, faCar, faUtensils, faTelevision, faRestroom, faBus,
    faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import styles from './Filters.module.css';






const Filters = () => {
    const dispatch = useDispatch();
    const { location, selectedFilters } = useSelector((state) => state.vehicles.filters);

    const [showEquipment, setShowEquipment] = useState(true);
    const [showVehicleType, setShowVehicleType] = useState(true);

    

    const handleFilterChange = (filter) => {
        dispatch(setFilter({ filter, value: !selectedFilters[filter] }));
        dispatch(applyFilters()); // Apply filters immediately after setting a filter
    };
    
    const handleLocationChange = (e) => {
        dispatch(setLocation(e.target.value));
        dispatch(applyFilters()); // Apply filters immediately after setting location
    };

    const handleSearch = () => {
        dispatch(fetchVehicles());
    };
    

    return (
        <div className={styles.filtersSection}>
            <div className={styles.filters}>
                <h3>Location</h3>
                <input
                    type="text"
                    placeholder="Kyiv, Ukraine"
                    value={location}
                    onChange={handleLocationChange}
                />
            </div>

            <h3>Filters</h3>

            {/* Vehicle Equipment Section */}
            <div className={styles.filterSection}>
                <h4 onClick={() => setShowEquipment(!showEquipment)}>
                    Vehicle Equipment
                    <FontAwesomeIcon
                        icon={showEquipment ? faChevronUp : faChevronDown}
                        className={styles.chevronIcon}
                    />
                </h4>
                {showEquipment && (
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
                )}
            </div>

            {/* Vehicle Type Section */}
            <div className={styles.filterSection}>
                <h4 onClick={() => setShowVehicleType(!showVehicleType)}>
                    Vehicle Type
                    <FontAwesomeIcon
                        icon={showVehicleType ? faChevronUp : faChevronDown}
                        className={styles.chevronIcon}
                    />
                </h4>
                {showVehicleType && (
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
                )}
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Filters;
