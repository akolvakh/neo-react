import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api'; // Ensure this is correct
import styles from './Details.module.css'; // Adjust the import path as necessary

const Details = () => {
    const { id } = useParams(); // Get the camper ID from the URL params
    const [camper, setCamper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('features'); // State for active tab

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

    const featureKeys = [
        { key: 'AC', label: 'AC' },
        { key: 'bathroom', label: 'Bathroom' },
        { key: 'kitchen', label: 'Kitchen' },
        { key: 'TV', label: 'TV' },
        { key: 'radio', label: 'Radio' },
        { key: 'refrigerator', label: 'Refrigerator' },
        { key: 'microwave', label: 'Microwave' },
      ];

    // Render the camper details
    return (
        <div className={styles.detailsContainer}>
            <h1>{camper.name}</h1>
            <p className={styles.infoLine}>{camper.rating} ⭐ | {camper.location}</p>
            <h2>{camper.price} €</h2>
            <div className={styles.photoSection}>
                {camper.gallery.length > 0 ? (
                    camper.gallery.map((image, index) => (
                        <img key={index} src={image.original} alt={`Camper ${camper.name} ${index}`} />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <p>{camper.description}</p>
            
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

            <div className={styles.flexContainer}>
                <div className={styles.featuresContainer}>
                    {activeTab === 'features' && (
                        <div className={styles.card}>

  <div className={styles.rvCard__features}>
    {camper.AC && <span className={styles.rvCard__badge}>AC</span>}
    {camper.bathroom && <span className={styles.rvCard__badge}>Bathroom</span>}
    {camper.kitchen && <span className={styles.rvCard__badge}>Kitchen</span>}
    {camper.TV && <span className={styles.rvCard__badge}>TV</span>}
    {camper.radio && <span className={styles.rvCard__badge}>Radio</span>}
    {camper.refrigerator && <span className={styles.rvCard__badge}>Refrigerator</span>}
    {camper.microwave && <span className={styles.rvCard__badge}>Microwave</span>}
  </div>

                            {/* Vehicle Details Section */}
                            <h3>Vehicle Details</h3>
                            <hr className={styles.separator} />
                            <div className={styles.vehicleDetails}>
                                <div className={styles.detailItem}>
                                    <span>Form:</span>
                                    <span>{camper.form}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Length:</span>
                                    <span>{camper.length}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Width:</span>
                                    <span>{camper.width}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Height:</span>
                                    <span>{camper.height}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Tank:</span>
                                    <span>{camper.tank}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>Consumption:</span>
                                    <span>{camper.consumption}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className={styles.reviews}>
                            <h3>Reviews</h3>
                            {camper.reviews.length > 0 ? (
                                camper.reviews.map((review, index) => (
                                    <div className={styles.reviewItem} key={index}>
                                        <div className={styles.reviewerAvatar}>
                                            {review.reviewer_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <span className={styles.reviewerName}>{review.reviewer_name}</span>
                                            <span className={styles.reviewRating}> ({review.reviewer_rating}⭐)</span>
                                            <p className={styles.reviewText}>{review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available</p>
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.bookingForm}>
    <h3>Book your campervan now</h3>
    <p>Stay connected! We are always ready to help you.</p>
    <form>
        <input type="text" placeholder="Name*" required />
        <input type="email" placeholder="Email*" required />
        <input type="date" placeholder="Booking date*" required />
        <textarea placeholder="Comment"></textarea>
        <button type="submit">Send</button>
    </form>
</div>
            </div>
        </div>
    );
};

export default Details;
