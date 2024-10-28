import { Triangle } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Triangle color="red" height={80} width={80} />
    </div>
  );
};

export default Loader;
