import SvgIcon from "../SvgIcon/SvgIcon";
import styles from "./Features.module.css";

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

const Features = ({ camper }) => {
  return (
    <div className={styles.card}>
      <div className={styles.rvCard__features}>
        {camper?.transmission && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="transmission" size={16} />{" "}
            {camper.transmission.charAt(0).toUpperCase() +
              camper.transmission.slice(1)}
          </span>
        )}
        {camper?.form && (
          <span className={styles.rvCard__badge}>
            <SvgIcon
              path={formIcons[camper?.form] || "defaultIcon"}
              size={16}
            />
            {formDisplayNames[camper?.form] ||
              camper?.form.charAt(0).toUpperCase() + camper?.form.slice(1)}
          </span>
        )}
        {camper?.engine && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="engine" size={16} />{" "}
            {camper.engine.charAt(0).toUpperCase() + camper.engine.slice(1)}
          </span>
        )}
        {camper?.AC && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="ac" size={16} /> AC
          </span>
        )}
        {camper?.bathroom && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="bathroom" size={16} /> Bathroom
          </span>
        )}
        {camper?.kitchen && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="kitchen" size={16} /> Kitchen
          </span>
        )}
        {camper?.TV && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="tv" size={16} /> TV
          </span>
        )}
        {camper?.radio && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="radio" size={16} /> Radio
          </span>
        )}
        {camper?.refrigerator && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="refrigerator" size={16} /> Refrigerator
          </span>
        )}
        {camper?.microwave && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="microwave" size={16} /> Microwave
          </span>
        )}
        {camper?.gas && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="gas" size={16} /> Gas
          </span>
        )}
        {camper?.water && (
          <span className={styles.rvCard__badge}>
            <SvgIcon path="water" size={16} /> Water
          </span>
        )}
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
  );
};

export default Features;
