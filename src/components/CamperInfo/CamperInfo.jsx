// CamperInfo.jsx
import React from 'react';
import styles from './CamperInfo.module.css';
import SvgIcon from '../SvgIcon/SvgIcon'; // Import the SvgIcon component


const CamperInfo = ({ name, rating, location, price, reviews }) => {
    const formatPrice = (price) => {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div>
            <h1>{name}</h1>

            <div className={styles.rvCard__info}>
            <div className={styles.rvCard__reviews}>
            <SvgIcon path="rating" size={16} /> {rating} ({reviews.length} Reviews)
            </div>
            <div className={styles.rvCard__location}>
            <SvgIcon path="map" size={16} /> {location}
            </div>
            </div>

            <h2>{formatPrice(price)} €</h2>
        </div>
    );
};

export default CamperInfo;

