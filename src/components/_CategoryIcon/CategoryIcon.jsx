import React from 'react';
import styles from './CategoryIcon.module.css';

const CategoryIcon = ({ label, icon }) => {
  return (
    <div className={styles.iconWrapper}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default CategoryIcon;
