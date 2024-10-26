// src/components/Loader/Loader.jsx
import { Triangle } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loaderOverlay}>
      <Triangle color="red" height={80} width={80} />
    </div>
  );
};

export default Loader;
