import React, { useState } from "react";
import {
  firebaseContext,
  useFirebaseContext,
} from "../../provider/FirebaseProvider";
import { useContext, useEffect } from "react";
import "./Profile.scss";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import SearchField from "../../components/SearchField/SearchField";
import { Link } from "react-router-dom";
import { kebabCase } from "lodash";

const Profile = () => {
  const { userData, getRestaurantDetails, restDetails } = useContext(
    firebaseContext
  );
  const ready = Boolean(userData?.userInfo);

  return !ready ? null : (
    <ProfileContent {...{ userInfo: userData.userInfo }} />
  );
};

export default Profile;

function ProfileContent({ userInfo }) {
  const [restosList, setRestosList] = useState([]);
  const { userData, getRestaurantDetails, restDetails, signOutUser, } = useContext(
    firebaseContext
  );
  const {
    fullName,
    restoList: restoIdsList,
    following,
    followers,
    userAvatar,
    city,
  } = userInfo;

  const { getManyRestaurantDetails } = useFirebaseContext();

  // fetch many restaurants on mount
  useEffect(() => {
    getManyRestaurantDetails(userData.userInfo.restoList).then((resp) => {
      setRestosList(resp);
    });
  }, [restoIdsList]);
  console.log(restosList);

  return (
    <>
      {/* profile section, incl image + user data */}
      <section className="profile">
        <div className="profile__user">
          <div className="profile__info">
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="User Avatar"
            />
            <p className="profile__name">{fullName}</p>
          </div>
          <div className="profile__metrics">
            <p className="profile__posts">{restoIdsList.length} posts</p>
            <p className="profile__posts">{followers.length} followers</p>
            <p className="profile__posts">{following.length} following</p>
          </div>
          <div className="profile__location">
            <p className="profile__city">{city}</p>
            <button className="profile__logout" type="submit" onSubmit={signOutUser}>Logout</button>
          </div>
        </div>
        <ProfileNav />
        <SearchField />

        {/* restaurant posts */}
        <div className="profile__post">
          {restosList.map((resto) => {
            return (
              <Link
                className="profile__link"
                to={`/restaurants/${kebabCase(resto.restoName)}`}
                className="profile__resto-card"
              >
                <img className="profile__post-img" src={resto.restoImgs[0]} alt="Restaurant"/>
                <p className="profile__post-name">{resto.restoName}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
