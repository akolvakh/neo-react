// Gallery.jsx
import React from 'react';
import styles from './Gallery.module.css';

const Gallery = ({ gallery = [], name }) => {
    return (
        <div className={styles.photoSection}>
            {gallery.length > 0 ? (
                gallery.map((image, index) => (
                    <img key={index} src={image.original} alt={`Camper ${name} ${index}`} />
                ))
            ) : (
                <p>No images available</p>
            )}
        </div>
    );
};

export default Gallery;
