// Reviews.jsx
import React from 'react';
import styles from './Reviews.module.css';

const Reviews = ({ reviews }) => {
    return (
        <ul className={styles.reviewList}>
            {reviews.map((review, index) => {
                // Define reviewerInitial here based on reviewer's name
                const reviewerInitial = review.reviewer_name.charAt(0).toUpperCase();
                
                return (
                    <li className={styles.reviewItem} key={index}>
                        <div className={styles.reviewerAvatar}>{reviewerInitial}</div>
                        <div className={styles.reviewerDetails}>
                            <div className={styles.reviewerHeader}>
                                <span className={styles.reviewerName}>{review.reviewer_name}</span>
                                <span className={styles.reviewRating}>{'⭐'.repeat(review.reviewer_rating)}</span>
                            </div>
                            <p className={styles.reviewText}>{review.comment}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Reviews;
