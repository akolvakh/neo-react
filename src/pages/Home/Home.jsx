import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link to="/catalog">
            <Button label="View Now" variant="primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
