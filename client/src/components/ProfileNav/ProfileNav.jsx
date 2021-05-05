import React from "react";
import "./ProfileNav.scss";
import { Link } from "react-router-dom";
import * as CONSTANTS from "../../constants/Constants";

const ProfileNav = () => {
  return (
    <nav className="prof-nav">
      <ul className="prof-nav__list">
        <li className="prof-nav__item-posts">
          <Link to={CONSTANTS.PROFILE} className="prof-nav__link">
          <p className="prof-nav__text--posts">Posts</p>
          </Link>
        </li>
        <li className="prof-nav__item-bucket">
          <Link to={CONSTANTS.BUCKET_LIST} className="prof-nav__link">
            <p className="prof-nav__text">Bucket List</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileNav;
