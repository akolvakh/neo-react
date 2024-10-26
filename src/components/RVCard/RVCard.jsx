import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RVCard.module.css';
import { useNavigate } from 'react-router-dom';

const RVCard = ({ rv }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite status

  const toggleFavorite = () => {
    setIsFavorite(prevState => !prevState); // Toggle favorite status
  };

  const navigate = useNavigate(); // Change useHistory to useNavigate

  const handleShowMore = () => {
    navigate(`/details/${rv.id}`); // Use the navigate function to change the route
};

  return (
    <div className={styles.rvCard}>
      <img src={rv.gallery[0].thumb} alt={rv.name} />
      <div className={styles.rvCard__details}>
        <div className={styles.rvCard__header}>
          <h3 className={styles.rvCard__title}>{rv.name}</h3>
          <div className={styles.rvCard__actions}>
            <span className={styles.rvCard__price}>€{rv.price}</span>
            <button 
              className={`${styles.rvCard__favoriteButton} ${isFavorite ? styles.favorited : ''}`} 
              onClick={toggleFavorite}
            >
              ❤️
            </button>
          </div>
        </div>
        <div className={styles.rvCard__info}>
          <div className={styles.rvCard__reviews}>
            ⭐ {rv.rating} ({rv.reviews.length} Reviews)
          </div>
          <div className={styles.rvCard__location}>
            📍 {rv.location}
          </div>
        </div>
        <p className={styles.rvCard__description}>{rv.description}</p>
        <div className={styles.rvCard__features}>
          {rv.AC && <span className={styles.rvCard__badge}>AC</span>}
          {rv.bathroom && <span className={styles.rvCard__badge}>Bathroom</span>}
          {rv.kitchen && <span className={styles.rvCard__badge}>Kitchen</span>}
          {rv.TV && <span className={styles.rvCard__badge}>TV</span>}
        </div>
        {/* <button className={styles.rvCard__showMoreButton}>Show more</button> */}
        {/* <Link to={`/details/${rv.id}`} className={styles.showMoreButton}>Show More</Link> */}
        <div>
            <h3>{rv.name}</h3>
            <button onClick={handleShowMore}>Show More</button>
        </div>
      </div>
    </div>
  );
};

export default RVCard;

