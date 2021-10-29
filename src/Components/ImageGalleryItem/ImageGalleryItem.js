import PropTypes from "prop-types";
import style from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({src}) {
  return <img src={src} className={style.ImageGalleryItem_image} alt="images" />;
}
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
};
