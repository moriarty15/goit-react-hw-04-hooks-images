import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

export default function Modal(props) {
  const { src, onClose, alt } = props;

  useEffect(() => {
    window.addEventListener("keydown", closeModalByClickESC);
    return () => {
      window.removeEventListener("keydown", closeModalByClickESC);
    };
  });
  const closeModalByClickESC = (e) => {
    if (e.code === "Escape") onClose();
  };

  const handleClickBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className={style.Overlay} onClick={handleClickBackdrop}>
      <div className={style.Modal} width="300" heigth="300">
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
