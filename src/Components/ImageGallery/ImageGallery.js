import PropTypes from "prop-types";
import style from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";

export default function ImageGallery({ images }) {
  return (
    <>
      {
        images.length !== 0 && <ul className={style.ImageGallery}>
          {
            images.map(({ id, webformatURL }) => (
              <li key={id}>
                <ImageGalleryItem src={webformatURL} />
              </li>
            ))}
        </ul>
      }
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};
