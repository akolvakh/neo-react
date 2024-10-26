// CamperInfo.jsx
import React from 'react';
import styles from './CamperInfo.module.css';

const CamperInfo = ({ name, rating, location, price }) => {
    const formatPrice = (price) => {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <div>
            <h1>{name}</h1>
            <p className={styles.infoLine}>{rating} ⭐ | {location}</p>
            <h2>{formatPrice(price)} €</h2>
        </div>
    );
};

export default CamperInfo;
