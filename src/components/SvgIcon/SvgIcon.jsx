import clsx from 'clsx';

const SvgIcon = ({ path, width, height, size = 20, className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    width={width ?? size}
    height={height ?? size}
    className={clsx(`icon-${path}`, className)}
    style={{ fill: 'currentColor' }} // Make sure it inherits the color
  >
    {/* <use href={`../src/assets/sprite.svg#icon-${path}`} /> */}
    <use href={`/icons/sprite.svg#icon-${path}`} />
  </svg>
);

export default SvgIcon;



