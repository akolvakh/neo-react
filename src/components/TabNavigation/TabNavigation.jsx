// TabNavigation.jsx
import React from 'react';
import styles from './TabNavigation.module.css';

const TabNavigation = ({ activeTab, setActiveTab }) => (
    <div className={styles.tabs}>
        <button 
            className={`${styles.tab} ${activeTab === 'features' ? styles.activeTab : ''}`} 
            onClick={() => setActiveTab('features')}
        >
            Features
        </button>
        <button 
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.activeTab : ''}`} 
            onClick={() => setActiveTab('reviews')}
        >
            Reviews
        </button>
    </div>
);

export default TabNavigation;
