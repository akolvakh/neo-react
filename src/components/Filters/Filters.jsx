import { useDispatch, useSelector } from "react-redux";
import {
  setPendingFilter,
  setPendingLocation,
  applyPendingFilters,
} from "../../redux/vehiclesSlice";
import SvgIcon from "../SvgIcon/SvgIcon";
import Button from "../../components/Button/Button";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const location = useSelector(
    (state) => state.vehicles.pendingFilters?.location || ""
  );
  const selectedFilters = useSelector(
    (state) => state.vehicles.pendingFilters?.selectedFilters || {}
  );

  const handleFilterChange = (filter) => {
    dispatch(setPendingFilter({ filter, value: !selectedFilters[filter] }));
  };

  const handleLocationChange = (e) => {
    dispatch(setPendingLocation(e.target.value));
  };

  const handleSearch = () => {
    dispatch(applyPendingFilters());
  };

  return (
    <div className={styles.filtersSection}>
      <div className={styles.filterLocationGroup}>
        <span className={styles.label}>Location</span>
        <div className={styles.locationInputWrapper}>
          <SvgIcon path="map" className={styles.locationIcon} size={20} />
          <input
            type="text"
            placeholder="Kyiv, Ukraine"
            value={location}
            onChange={handleLocationChange}
            className={styles.locationInput}
          />
        </div>
      </div>
      <div className={styles.filtersSubgroup}>
        <h2 className={styles.title}>Filters</h2>
        <div className={styles.filterGroup}>
          <h3>Vehicle Equipment</h3>
          <hr className={styles.divider} />
          <div className={styles.equipmentButtons}>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.AC ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.AC}
                onChange={() => handleFilterChange("AC")}
                style={{ display: "none" }}
              />
              <SvgIcon path="ac" size={24} className={styles.iconHoverEffect} />
              <span className={styles.titleFilter}>AC</span>
            </label>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.automatic ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.automatic}
                onChange={() => handleFilterChange("automatic")}
                style={{ display: "none" }}
              />
              <SvgIcon
                path="transmission"
                size={24}
                className={styles.iconHoverEffect}
              />{" "}
              <span className={styles.titleFilter}>Automatic</span>
            </label>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.kitchen ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.kitchen}
                onChange={() => handleFilterChange("kitchen")}
                style={{ display: "none" }}
              />
              <SvgIcon
                path="kitchen"
                size={24}
                className={styles.iconHoverEffect}
              />
              <span className={styles.titleFilter}>Kitchen</span>
            </label>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.TV ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.TV}
                onChange={() => handleFilterChange("TV")}
                style={{ display: "none" }}
              />
              <SvgIcon path="tv" size={24} className={styles.iconHoverEffect} />
              <span className={styles.titleFilter}>TV</span>
            </label>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.bathroom ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.bathroom}
                onChange={() => handleFilterChange("bathroom")}
                style={{ display: "none" }}
              />
              <SvgIcon
                path="bathroom"
                size={24}
                className={styles.iconHoverEffect}
              />
              <span className={styles.titleFilter}>Bathroom</span>
            </label>
          </div>
        </div>
        <div className={styles.filterGroup}>
          <h3>Vehicle Type</h3>
          <hr className={styles.divider} />
          <div className={styles.typeButtons}>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.van ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.van}
                onChange={() => handleFilterChange("van")}
                style={{ display: "none" }}
              />
              <SvgIcon
                path="van"
                size={24}
                className={styles.iconHoverEffect}
              />
              <span className={styles.titleFilter}>Van</span>
            </label>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.fullyIntegrated ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.fullyIntegrated}
                onChange={() => handleFilterChange("fullyIntegrated")}
                style={{ display: "none" }}
              />
              <SvgIcon
                path="fully"
                size={24}
                className={styles.iconHoverEffect}
              />
              <span className={styles.titleFilter}>Fully Integrated</span>
            </label>
            <label
              className={`${styles.filterButton} ${
                selectedFilters.alcove ? styles.active : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedFilters.alcove}
                onChange={() => handleFilterChange("alcove")}
                style={{ display: "none" }}
              />
              <SvgIcon
                path="alcove"
                size={24}
                className={styles.iconHoverEffect}
              />
              <span className={styles.titleFilter}>Alcove</span>
            </label>
          </div>
        </div>
      </div>
      <Button label="Search" variant="primary" onClick={handleSearch} />
    </div>
  );
};

export default Filters;
