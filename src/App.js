import style from "./App.module.css";
import React, { useState, useEffect } from "react";
import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [large, setLarge] = useState(null);
  const [alt, setAlt] = useState(null);

  useEffect(() => {
    localStorage.setItem("images", "[]");
    window.addEventListener("click", (e) => {
      const findImg = e.target.src;
      const arrImg = JSON.parse(localStorage.getItem("images"));
      const findImgforModal = arrImg.find((e) => e.webformatURL === findImg);
      if (findImgforModal) {
        setLarge(findImgforModal.largeImageURL);
        setAlt(findImgforModal.user);
        setShowModal(true);
      }
    });
  }, []);

  const onClose = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (query) => {
    setQuery(query);
    setPage(1);
  };

  const clickLoadMore = (e) => {
    e.preventDefault();
    setPage(state => state + 1)
  };

  return (
    <div className={style.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} page={page} />

      {query !== "" && <Button onClick={clickLoadMore} />}
      {showModal && <Modal src={large} onClose={onClose} alt={alt} />}
    </div>
  );
}
export default App;
