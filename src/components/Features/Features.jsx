// Features.jsx
import React from 'react';
import styles from './Features.module.css';

const Features = ({ camper }) => {
    return (
        <div className={styles.card}>
            <div className={styles.rvCard__features}>
                {camper?.AC && <span className={styles.rvCard__badge}>AC</span>}
                {camper?.bathroom && <span className={styles.rvCard__badge}>Bathroom</span>}
                {camper?.kitchen && <span className={styles.rvCard__badge}>Kitchen</span>}
                {camper?.TV && <span className={styles.rvCard__badge}>TV</span>}
                {camper?.radio && <span className={styles.rvCard__badge}>Radio</span>}
                {camper?.refrigerator && <span className={styles.rvCard__badge}>Refrigerator</span>}
                {camper?.microwave && <span className={styles.rvCard__badge}>Microwave</span>}
            </div>
            <h3>Vehicle Details</h3>
        <hr className={styles.separator} />
        <div className={styles.vehicleDetails}>
            <div className={styles.detailItem}>
                <span>Form:</span>
                <span>{camper?.form}</span>
            </div>
            <div className={styles.detailItem}>
                <span>Length:</span>
                <span>{camper?.length}</span>
            </div>
            <div className={styles.detailItem}>
                <span>Width:</span>
                <span>{camper?.width}</span>
            </div>
            <div className={styles.detailItem}>
                <span>Height:</span>
                <span>{camper?.height}</span>
            </div>
            <div className={styles.detailItem}>
                <span>Tank:</span>
                <span>{camper?.tank}</span>
            </div>
            <div className={styles.detailItem}>
                <span>Consumption:</span>
                <span>{camper?.consumption}</span>
            </div>
        </div>
        </div>
    );
};

export default Features;

