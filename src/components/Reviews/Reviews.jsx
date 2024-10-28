import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  return (
    <ul className={styles.reviewList}>
      {reviews.map((review, index) => {
        const reviewerInitial = review.reviewer_name.charAt(0).toUpperCase();

        return (
          <li className={styles.reviewItem} key={index}>
            <div className={styles.reviewerBox}>
              <div className={styles.reviewerAvatar}>{reviewerInitial}</div>
              <div className={styles.reviewerHeader}>
                <span className={styles.reviewerName}>
                  {review.reviewer_name}
                </span>
                <span className={styles.reviewRating}>
                <div className={styles.ratingContainer}>
    {Array.from({ length: review.reviewer_rating }, (_, index) => (
        <SvgIcon key={index} path="rating" size={16} className={styles.rating} />
    ))}
</div>
                </span>
              </div>
            </div>
            <div className={styles.reviewerDetails}>
              <p className={styles.reviewText}>{review.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;
