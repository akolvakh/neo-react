import React from 'react';
import styles from './RVCard.module.css';

const RVCard = ({ rv }) => {
    return (
        <div className={styles.rvCard}>
            <img src={rv.image} alt={rv.name} />
            <div className={styles.rvCard__details}>
                <h3 className={styles.rvCard__title}>{rv.name}</h3>
                <div className={styles.rvCard__reviews}>
                    ⭐ {rv.reviews} Reviews
                </div>
                <div className={styles.rvCard__location}>
                    📍 {rv.location}
                </div>
                <div className={styles.rvCard__features}>
                    {rv.features.map((feature, index) => (
                        <span key={index} className={styles.rvCard__badge}>
                            {feature}
                        </span>
                    ))}
                </div>
                <div className={styles.rvCard__price}>€{rv.price}</div>
                <button className={styles.rvCard__showMoreButton}>Show more</button>
            </div>
        </div>
    );
};

export default RVCard;

