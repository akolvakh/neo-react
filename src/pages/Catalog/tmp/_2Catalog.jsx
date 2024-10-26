import React, { useEffect, useState } from 'react';
import RVCard from '../../components/RVCard/RVCard';
import api from '../../services/api';
import { ERROR_TEXT } from '../../services/constants';
import styles from './Catalog.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faCar, faUtensils, faTelevision, faRestroom, faBus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';



const Catalog = () => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(5); // Number of visible RVs
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more RVs

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.fetchCampers();
        console.log('Response Data:', response);
        if (response && response.items) {
          setCampers(response.items);  
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

  const handleLoadMore = async () => {
    setLoadingMore(true); // Set loading more to true
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 5); // Increase visible RVs by 5
      setLoadingMore(false); // Set loading more to false after loading is complete
    }, 1000); // Simulate a network request with a timeout
  };

  console.log(campers);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className={styles.catalog}>
      <div className={styles.filtersSection}>





      <div className={styles.filters}>
    <h3>Location</h3>
    <input type="text" placeholder="Kyiv, Ukraine" />
</div>


    <h3>Filters</h3>

  
  <div className={styles.filters}>
  <h4>Vehicle Equipment</h4>
  <hr className={styles.divider} />
  <div className={styles.equipmentButtons}>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faSnowflake} /> 
      <span>AC</span>
    </button>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faCar} />
      <span>Automatic</span>
    </button>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faUtensils} />
      <span>Kitchen</span>
    </button>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faTelevision} />
      <span>TV</span>
    </button>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faRestroom} />
      <span>Bathroom</span>
    </button>
  </div>
</div>

<div className={styles.vehicleType}>
  <h4>Vehicle Type</h4>
  <hr className={styles.divider} /> {/* Divider */}
  <div className={styles.typeButtons}>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faBus} /> Van
    </button>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faBus} /> Fully Integrated
    </button>
    <button className={styles.filterButton}>
      <FontAwesomeIcon icon={faBus} /> Alcove
    </button>
  </div>
</div>
  
  <button className={styles.searchButton}>Search</button>
</div>
      <div className={styles.rvCardsSection}>
        {campers.slice(0, visibleCount).map((rv) => (
          <RVCard key={rv.id} rv={rv} />
        ))}
        
        {loadingMore ? (
          <div className={styles.loadingText}>Loading...</div> // Show loader when loading more
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
