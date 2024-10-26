import React from 'react';
import RVCard from '../../components/RVCard/RVCard'; // Card component for each RV
import styles from './Catalog.module.css';

const Catalog = () => {
  const rvList = [
    { 
        id: 1, 
        name: 'Mavericks', 
        description: 'Embrace simplicity and freedom...', 
        image: '/images/adventure-van.jpg', 
        price: '8000.00', 
        reviews: '4.4(62)', 
        location: 'Kyiv, Ukraine', 
        features: ['Automatic', 'Petrol', 'Kitchen', 'AC'] 
    },
    { 
        id: 2, 
        name: 'Kuga Camper', 
        description: 'Travel in style...', 
        image: '/images/luxury-rv.jpg', 
        price: '8000.00', 
        reviews: '4.2(110)', 
        location: 'Kyiv, Ukraine', 
        features: ['Automatic', 'Petrol', 'Kitchen', 'AC'] 
    },
    { 
        id: 3, 
        name: 'Road Bear C 23-25', 
        description: 'Perfect for off-road...', 
        image: '/images/compact-camper.jpg', 
        price: '8000.00', 
        reviews: '4.1(41)', 
        location: 'Kyiv, Ukraine', 
        features: ['Automatic', 'Petrol', 'AC'] 
    }
];


  return (
    <section className={styles.catalog}>
      <div className={styles.filtersSection}>
        <div className={styles.location}>
          <h3>Location</h3>
          <input type="text" placeholder="Kyiv, Ukraine" />
        </div>
        <div className={styles.filters}>
          <h4>Vehicle Equipment</h4>
          <button className={styles.filterButton}>AC</button>
          <button className={styles.filterButton}>Automatic</button>
          <button className={styles.filterButton}>Kitchen</button>
          <button className={styles.filterButton}>TV</button>
          <button className={styles.filterButton}>Bathroom</button>
        </div>
        <div className={styles.vehicleType}>
          <h4>Vehicle Type</h4>
          <button className={styles.filterButton}>Van</button>
          <button className={styles.filterButton}>Fully Integrated</button>
          <button className={styles.filterButton}>Alcove</button>
        </div>
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.rvCardsSection}>
        {rvList.map(rv => (
          <RVCard key={rv.id} rv={rv} />
        ))}
      </div>
    </section>
  );
};

export default Catalog;
