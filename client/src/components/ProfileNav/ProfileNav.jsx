import React from "react";
import "./ProfileNav.scss";
import { Link } from "react-router-dom";

const ProfileNav = () => {
  return (
    <nav className="prof-nav">
      <ul className="prof-nav__list">
        <li className="prof-nav__item-posts">
          <Link to={"/profile"} className="prof-nav__link">
            <p className="prof-nav__text--posts">Posts</p>
          </Link>
        </li>
        <li className="prof-nav__item-bucket">
          <Link to={"/bucket-list"} className="prof-nav__link">
            <p className="prof-nav__text">Bucket List</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNav;
