import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api'; // Ensure this is correct
import styles from './Details.module.css'; // Adjust the import path as necessary

const Details = () => {
    const { id } = useParams(); // Get the camper ID from the URL params
    const [camper, setCamper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCamperData = async () => {
            try {
                const response = await api.fetchCamperDetails(id); // Use the correct function here
                setCamper(response); // Update state with the fetched data
            } catch (e) {
                setError('Failed to load camper details');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchCamperData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Render the camper details
    return (
        <div className={styles.details}>
            <h1>{camper.name}</h1>
            <p>{camper.rating} ⭐ | {camper.location}</p>
            <h2>{camper.price} €</h2>
            <div className={styles.gallery}>
                {camper.gallery.length > 0 ? (
                    camper.gallery.map((image, index) => (
                        <img key={index} src={image.original} alt={`Camper ${camper.name} ${index}`} width={292} height={312} />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <p>{camper.description}</p>
            <div className={styles.features}>
                <h3>Features</h3>
                <p>AC: {camper.AC ? 'Yes' : 'No'}</p>
                <p>Bathroom: {camper.bathroom ? 'Yes' : 'No'}</p>
                <p>Kitchen: {camper.kitchen ? 'Yes' : 'No'}</p>
                <p>TV: {camper.TV ? 'Yes' : 'No'}</p>
                <p>Radio: {camper.radio ? 'Yes' : 'No'}</p>
                <p>Refrigerator: {camper.refrigerator ? 'Yes' : 'No'}</p>
                <p>Microwave: {camper.microwave ? 'Yes' : 'No'}</p>
            </div>
            <div className={styles.reviews}>
                <h3>Reviews</h3>
                {camper.reviews.length > 0 ? (
                    camper.reviews.map((review, index) => (
                        <div key={index}>
                            <p><strong>{review.reviewer_name}</strong> ({review.reviewer_rating}⭐): {review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
            <div className={styles.bookingForm}>
                <h3>Book your campervan now</h3>
                {/* Add form fields here */}
            </div>
        </div>
    );
};

export default Details;
