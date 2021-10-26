import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";
import LoaderFoo from "../Loader";

export default function ImageGallery({ query, page }) {
  const [isDone, setIsDone] = useState(false);
  const [showSpiner, setShowSpiner] = useState(false);

  useEffect(() => {
    if (query === "") return
    if (page === 1) {
      localStorage.setItem("images", "[]");
    }
    
    fetchRequest()
  }, [query, page])

  const fetchRequest = () => {
    setShowSpiner(true);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=23320531-e67f94e9f6229e6b46894ace7&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((r) => r.json())
      .then((hit) => {
        const saveImg = JSON.parse(localStorage.getItem("images"));
        saveImg.push(...hit.hits);
        localStorage.setItem("images", JSON.stringify(saveImg));
        setShowSpiner(false);
        setIsDone(true);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  const images = JSON.parse(localStorage.getItem("images"));
  return (
    <>
      {isDone && (
        <ul className={style.ImageGallery}>
          {images.length !== 0 &&
            images.map(({ id, webformatURL, user }) => (
              <li key={id}>
                <ImageGalleryItem src={webformatURL} alt={user} />
              </li>
            ))}
        </ul>
      )}
      {showSpiner && (
        <div className={style.centred}>
          <LoaderFoo />
        </div>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
