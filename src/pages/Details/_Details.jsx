import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api'; // Import your API service
import { ERROR_TEXT } from '../../services/constants';
import styles from './Details.module.css';

const Details = () => {
    const { id } = useParams(); // Get the RV id from the URL
    const [rv, setRv] = useState(null); // State for the specific RV details
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCamperDetails = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await api.fetchCamperDetails(id); // Fetch the specific camper by ID
                if (response) {
                    setRv(response); // Set the fetched RV details to state
                } else {
                    throw new Error('No details found for this camper');
                }
            } catch (e) {
                console.error('Fetch Error:', e);
                setError(ERROR_TEXT);
            } finally {
                setLoading(false);
            }
        };

        fetchCamperDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!rv) return <div>No details available.</div>; // Handle case where RV is not found

    return (
        <div className={styles.details}>
            <h1>{rv.name}</h1>
            <div className={styles.detailsInfo}>
                <div className={styles.detailsImages}>
                    <img src={rv.gallery[0].original} alt={rv.name} />
                    <div className={styles.thumbnails}>
                        {rv.gallery.slice(1).map((image, index) => (
                            <img key={index} src={image.original} alt={`${rv.name} ${index + 1}`} />
                        ))}
                    </div>
                </div>
                <div className={styles.detailsDescription}>
                    <p>{rv.description}</p>
                    <h3>Features</h3>
                    <div className={styles.features}>
                        {rv.AC && <span>AC</span>}
                        {rv.bathroom && <span>Bathroom</span>}
                        {rv.kitchen && <span>Kitchen</span>}
                        {rv.TV && <span>TV</span>}
                        {rv.automatic && <span>Automatic</span>}
                    </div>
                    <h3>Vehicle details</h3>
                    <ul>
                        <li>Form: {rv.form}</li>
                        <li>Length: {rv.length}</li>
                        <li>Width: {rv.width}</li>
                        <li>Height: {rv.height}</li>
                        <li>Tank: {rv.tank}</li>
                        <li>Consumption: {rv.consumption}</li>
                    </ul>
                    <h3>Book your campervan now</h3>
                    <form>
                        <input type="text" placeholder="Name*" required />
                        <input type="email" placeholder="Email*" required />
                        <input type="date" placeholder="Booking date*" required />
                        <textarea placeholder="Comment" />
                        <button type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Details;
