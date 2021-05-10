import React from "react";
import SearchLogo from "../../assets/icons/search-24px.svg";
import './SearchField.scss';


const SearchField = ({searchString,setSearchString})=> {
    return (
      <form className="search-field__form">
        <input
          className="search-field__input"
          name="search"
          placeholder="Search..."
          value={searchString}
          onChange={(e)=>{setSearchString(e.target.value)}}
        />
        <img
          src={SearchLogo}
          alt="Search Logo"
          className="search-field__icon"
        />
      </form>
    );
  
}

export default SearchField;
