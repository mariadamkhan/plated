import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import Home from "../../assets/icons/home.svg";
import Upload from "../../assets/icons/upload.svg";
import User from "../../assets/icons/user.svg";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__container">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to={"/feed"} className="nav__link">
              <img className="nav__icon" src={Home} alt="Home Logo" />
            </Link>
          </li>
          <li className="nav__item">
            <Link to={"/upload"} className="nav__link">
              <img className="nav__icon" src={Upload} alt="Upload Logo" />
            </Link>
          </li>
          <li className="nav__item">
            <Link to={"/profile"} className="nav__link">
              <img className="nav__icon" src={User} alt="Home Logo" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
