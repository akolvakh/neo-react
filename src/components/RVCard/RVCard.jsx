import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/vehiclesSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Filled heart
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Regular heart
import styles from './RVCard.module.css';

const RVCard = ({ rv }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isFavorite = useSelector((state) => state.vehicles.favorites.includes(rv.id));

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(rv.id));
        console.log('Favorite toggled:', rv.id);
    };

    const handleShowMore = () => {
        navigate(`/details/${rv.id}`);
    };

    return (
        <div className={styles.rvCard}>
            <img src={rv.gallery[0].thumb} alt={rv.name} />
            <div className={styles.rvCard__details}>
                <div className={styles.rvCard__header}>
                    <h3 className={styles.rvCard__title}>{rv.name}</h3>
                    <div className={styles.rvCard__actions}>
                        <span className={styles.rvCard__price}>€{rv.price}</span>
                        <FontAwesomeIcon
                            icon={isFavorite ? solidHeart : regularHeart}
                            className={`${styles.rvCard__favoriteIcon} ${isFavorite ? styles.favorited : ''}`}
                            onClick={handleToggleFavorite}
                        />
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
                <div>
                    <h3>{rv.name}</h3>
                    <button onClick={handleShowMore}>Show More</button>
                </div>
            </div>
        </div>
    );
};

export default RVCard;
