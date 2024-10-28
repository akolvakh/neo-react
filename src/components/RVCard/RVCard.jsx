import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/vehiclesSlice";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../SvgIcon/SvgIcon";
import Button from "../../components/Button/Button";
import styles from "./RVCard.module.css";

const RVCard = ({ rv }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isFavorite = useSelector((state) =>
    state.vehicles.favorites.includes(rv.id)
  );

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(rv.id));
  };

  const handleShowMore = () => {
    window.open(`/catalog/${rv.id}`, '_blank');
  };
  
  const handleReviewsClick = () => {
    window.open(`/catalog/${rv.id}`, { state: { activeTab: "reviews" } });
  };

  const formatPrice = (price) => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: false,
    });
  };

  const formIcons = {
    alcove: "alcove",
    panelTruck: "van",
    fullyIntegrated: "fully",
  };

  const formDisplayNames = {
    panelTruck: "Van",
    alcove: "Alcove",
    fullyIntegrated: "Fully Integrated",
  };

  return (
    <div className={styles.rvCard}>
      <img src={rv.gallery[0].thumb} alt={rv.name} />
      <div className={styles.rvCard__details}>
        <div className={styles.rvCard__header}>
          <h3 className={styles.rvCard__title}>{rv.name}</h3>
          <div className={styles.rvCard__actions}>
            <span className={styles.rvCard__price}>
              €{formatPrice(rv.price)}
            </span>
            <div
              onClick={handleToggleFavorite}
              className={`${styles.rvCard__favoriteIconWrapper} ${
                isFavorite ? styles.favorited : ""
              }`}
            >
              <SvgIcon
                path="like"
                size={24}
                className={`${styles.rvCard__favoriteIcon} ${
                  isFavorite ? styles.favorited : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className={styles.rvCard__info}>
          <div className={styles.rvCard__reviews} onClick={handleReviewsClick}>
            <SvgIcon path="rating" size={16} className={styles.rating} />{" "}
            {rv.rating} ({rv.reviews.length} Reviews)
          </div>
          <div className={styles.rvCard__location}>
            <SvgIcon path="map" size={16} /> {rv.location}
          </div>
        </div>
        <p className={styles.rvCard__description}>
          {rv.description.length > 80
            ? `${rv.description.substring(0, 75)}...`
            : rv.description}
        </p>
        <div className={styles.rvCard__features}>
          {rv.transmission && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="transmission" size={16} />{" "}
              {rv.transmission.charAt(0).toUpperCase() +
                rv.transmission.slice(1)}
            </span>
          )}
          {rv.form && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path={formIcons[rv.form] || "defaultIcon"} size={16} />
              {formDisplayNames[rv.form] ||
                rv.form.charAt(0).toUpperCase() + rv.form.slice(1)}
            </span>
          )}
          {rv.engine && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="engine" size={16} />{" "}
              {rv.engine.charAt(0).toUpperCase() + rv.engine.slice(1)}
            </span>
          )}
          {rv.AC && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="ac" size={16} /> AC
            </span>
          )}
          {rv.bathroom && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="bathroom" size={16} /> Bathroom
            </span>
          )}
          {rv.kitchen && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="kitchen" size={16} /> Kitchen
            </span>
          )}
          {rv.TV && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="tv" size={16} /> TV
            </span>
          )}
          {rv.radio && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="radio" size={16} /> Radio
            </span>
          )}
          {rv.refrigerator && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="refrigerator" size={16} /> Refrigerator
            </span>
          )}
          {rv.microwave && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="microwave" size={16} /> Microwave
            </span>
          )}
          {rv.gas && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="gas" size={16} /> Gas
            </span>
          )}
          {rv.water && (
            <span className={styles.rvCard__badge}>
              <SvgIcon path="water" size={16} /> Water
            </span>
          )}
        </div>
        <div>
          <Button
            label="Show More"
            variant="primary"
            onClick={handleShowMore}
          />
        </div>
      </div>
    </div>
  );
};

export default RVCard;
