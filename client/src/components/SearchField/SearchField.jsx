import React, { Component } from "react";
import SearchLogo from "../../assets/icons/search-24px.svg";
import './SearchField.scss';


export class SearchField extends Component {
  render() {
    return (
      <form className="search-field__form">
        <input
          className="search-field__input"
          name="search"
          placeholder="Search..."
        />
        <img
          src={SearchLogo}
          alt="Search Logo"
          className="search-field__icon"
        />
      </form>
    );
  }
}

export default SearchField;
