import React from 'react';
import styles from './Input.module.css';

const Input = ({ label, placeholder, type = 'text' }) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Input;
