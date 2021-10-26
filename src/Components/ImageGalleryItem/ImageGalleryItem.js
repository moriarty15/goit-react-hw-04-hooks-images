import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem(props) {
  const { src, alt } = props;
  return <img src={src} alt={alt} className={style.ImageGalleryItem_image} />;
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
