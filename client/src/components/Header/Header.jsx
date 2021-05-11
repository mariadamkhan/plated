import React from "react";
import logo from "../../assets/images/demo-feed/logo.PNG";
import "./Header.scss";

function Header() {
  return (
    <nav className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Plated Logo" />
      </div>
    </nav>
  );
}
export default Header;
