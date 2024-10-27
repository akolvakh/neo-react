import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/vehiclesSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Filled heart
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Regular heart
import SvgIcon from '../SvgIcon/SvgIcon'; // Import the SvgIcon component
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

    const formatPrice = (price) => {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div className={styles.rvCard}>
            <img src={rv.gallery[0].thumb} alt={rv.name} />
            <div className={styles.rvCard__details}>
                <div className={styles.rvCard__header}>
                    <h3 className={styles.rvCard__title}>{rv.name}</h3>
                    <div className={styles.rvCard__actions}>
                        <span className={styles.rvCard__price}>€{formatPrice(rv.price)}</span>
                        <FontAwesomeIcon
                            icon={isFavorite ? solidHeart : regularHeart}
                            className={`${styles.rvCard__favoriteIcon} ${isFavorite ? styles.favorited : ''}`}
                            onClick={handleToggleFavorite}
                        />
                    </div>
                </div>
                <div className={styles.rvCard__info}>
                    <div className={styles.rvCard__reviews}>
                    <SvgIcon path="rating" size={16} /> {rv.rating} ({rv.reviews.length} Reviews)
                    </div>
                    <div className={styles.rvCard__location}>
                    <SvgIcon path="map" size={16} /> {rv.location}
                    </div>
                </div>
                <p className={styles.rvCard__description}>{rv.description}</p>
                <div className={styles.rvCard__features}>
                    {rv.transmission && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="transmission" size={16} /> {rv.transmission.charAt(0).toUpperCase() + rv.transmission.slice(1)}
                        </span>
                    )}
                    {rv.form && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="alcove" size={16} /> {rv.form.charAt(0).toUpperCase() + rv.form.slice(1)}
                        </span>
                    )}
                    {rv.engine && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="engine" size={16} /> {rv.engine.charAt(0).toUpperCase() + rv.engine.slice(1)}
                        </span>
                    )}
                    {rv.AC && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="ac" size={16} /> AC
                        </span>
                    )}
                    {rv.bathroom && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="bathroom" size={16} /> Bathroom
                        </span>
                    )}
                    {rv.kitchen && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="kitchen" size={16} /> Kitchen
                        </span>
                    )}
                    {rv.TV && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="tv" size={16} /> TV
                        </span>
                    )}
                    {rv.radio && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="radio" size={16} /> Radio
                        </span>
                    )}
                    {rv.refrigerator && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="refrigerator" size={16} /> Refrigerator
                        </span>
                    )}
                    {rv.microwave && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="microwave" size={16} /> Microwave
                        </span>
                    )}
                    {rv.gas && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="gas" size={16} /> Gas
                        </span>
                    )}
                    {rv.water && (
                        <span className={styles.rvCard__badge}>
                            <SvgIcon path="water" size={16} /> Water
                        </span>
                    )}
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
