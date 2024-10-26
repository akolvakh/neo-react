import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import api from '../../services/api';
import styles from './Details.module.css';






const Details = () => {
    const { id } = useParams();
    const [camper, setCamper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('features');

    const formatPrice = (price) => {
        return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    useEffect(() => {
        const fetchCamperData = async () => {
            try {
                const response = await api.fetchCamperDetails(id);
                setCamper(response);
            } catch (e) {
                setError('Failed to load camper details');
                toast.error('Failed to load camper details'); // Show error toast if data fetch fails
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchCamperData();
    }, [id]);

    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        bookingDate: Yup.date().required('Booking date is required'),
        comment: Yup.string().optional(),
    });

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.detailsContainer}>
            <Toaster position="top-right" reverseOrder={false} /> {/* Toast for error and success */}
            {error && <div>{error}</div>}
            
            {/* Rest of the component */}
            <h1>{camper?.name}</h1>
            <p className={styles.infoLine}>{camper?.rating} ⭐ | {camper?.location}</p>
            <h2>{formatPrice(camper?.price)} €</h2>
            <div className={styles.photoSection}>
                {camper?.gallery.length > 0 ? (
                    camper.gallery.map((image, index) => (
                        <img key={index} src={image.original} alt={`Camper ${camper.name} ${index}`} />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
            <p>{camper?.description}</p>

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
                    )}

                    {activeTab === 'reviews' && (
                        <div className={styles.reviews}>
                            <h3>Reviews</h3>
                            {camper?.reviews.length > 0 ? (
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
                    <Formik
                        initialValues={{ name: '', email: '', bookingDate: '', comment: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            toast.success('Booking successful!');
                            setSubmitting(false);
                            resetForm();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field type="text" name="name" placeholder="Name*" />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                                
                                <Field type="email" name="email" placeholder="Email*" />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                                
                                <Field type="date" name="bookingDate" placeholder="Booking date*" />
                                <ErrorMessage name="bookingDate" component="div" className={styles.error} />
                                
                                <Field as="textarea" name="comment" placeholder="Comment" />
                                
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Details;
