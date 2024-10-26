// Reviews.jsx
import React from 'react';
import styles from './Reviews.module.css';

const Reviews = ({ reviews = [] }) => (
    <div className={styles.reviews}>
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
            reviews.map((review, index) => (
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
);

export default Reviews;
