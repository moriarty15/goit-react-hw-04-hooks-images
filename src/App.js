import style from "./App.module.css";
import { useState, useEffect } from "react";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";
import Loader from "./Components/Loader";
import fetchImages from "./Components/fetchImages";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showSpiner, setShowSpiner] = useState(false);
  const [large, setLarge] = useState(null);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const findImg = e.target.src;
      const findImgforModal = images.find((e) => e.webformatURL === findImg);
      if (findImgforModal) {
        setLarge(findImgforModal.largeImageURL);
        setShowModal(true);
      }
    });
  }, [images]);

  useEffect(() => {
    if (query.trim() === "") {
      return
    }
    if (page === 1) {setImages([])}
    fetchRequest();

  }, [query, page]);


  const onClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
  };

  const clickLoadMore = (e) => {
    e.preventDefault();
    setPage(state => state + 1);
  };

  const fetchRequest = () => {
    setShowSpiner(true);

    fetchImages(query, page)
      .then((hit) => {
        if (hit.total === 0) {
          setShowSpiner(false);
          alert(
            "По данному запросу ничего не найдено, сделайте запрос более специфичным"
          );
          return;
        }
        const arrEx = hit.hits.map(({ id, largeImageURL, webformatURL }) => {
          return { id, largeImageURL, webformatURL };
        });
        setImages([...images, ...arrEx]);
        setShowSpiner(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((e) => {
        alert("Ой, что-то пошло не так");
      });
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} />

      {images.length >= 12 && <Button onClick={clickLoadMore} />}
      {showModal && <Modal src={large} onClose={onClose} />}
      {showSpiner && (
        <div className={style.centred}>
          <Loader />
        </div>
      )}
    </div>
  );
}
export default App;
