import { useState } from "react";
import style from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState("");

  const searchItem = (e) => {
    setQuery( e.currentTarget.value.toLowerCase());
  };
  const searchButton = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={style.Searchbar}>
      <form className={style.SearchForm} onSubmit={searchButton}>
        <button type="submit" className={style.SearchForm_button}>
          <span className={style.SearchForm_button_label}>Search</span>
        </button>

        <input
          onChange={searchItem}
          className={style.SearchForm_input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
