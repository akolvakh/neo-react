import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./CamperInfo.module.css";

const CamperInfo = ({ name, rating, location, price, reviews }) => {
  const formatPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div>
      <h1 className={styles.infoTitle}>{name}</h1>
      <div className={styles.rvCard__info}>
        <div className={styles.rvCard__reviews}>
          <SvgIcon path="rating" size={16} className={styles.rating} /> {rating}{" "}
          ({reviews.length} Reviews)
        </div>
        <div className={styles.rvCard__location}>
          <SvgIcon path="map" size={16} /> {location}
        </div>
      </div>
      <h2 className={styles.price}>{formatPrice(price)} €</h2>
    </div>
  );
};

export default CamperInfo;
