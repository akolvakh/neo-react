import React from "react";
import styles from "./Button.module.css";

const Button = ({ label, variant = "primary", onClick }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
