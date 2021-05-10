import React, { useState } from "react";
import {
  firebaseContext,
  useFirebaseContext,
} from "../../provider/FirebaseProvider";
import { useContext, useEffect } from "react";
import "./Profile.scss";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import SearchField from "../../components/SearchField/SearchField";
import { Link, useHistory } from "react-router-dom";
import { kebabCase } from "lodash";
import defaultAvatar from "../../assets/images/user.svg";
import exit from "../../assets/icons/exit.svg";

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
  const history = useHistory();
  console.log(
    "🚀 ~ file: Profile.jsx ~ line 28 ~ ProfileContent ~ restosList",
    restosList
  );
  const {
    userData,
    getRestaurantDetails,
    restDetails,
    signOutUser,
  } = useContext(firebaseContext);
  const {
    fullName,
    restoList: restoIdsList,
    following,
    followers,
    userAvatar,
    city,
  } = userInfo;

  const { getManyRestaurantDetails } = useFirebaseContext();

  async function handleLogOut() {
    try {
      await signOutUser();
      history.push("/");
    } catch {
      console.log("Didn't work");
    }
  }

  // fetch many restaurants on mount
  useEffect(() => {
    getManyRestaurantDetails(userData.userInfo.restoList).then((resp) => {
      setRestosList(resp);
    });
  }, []);
  console.log(restosList);

  return (
    <>
      {/* profile section, incl image + user data */}
      <section className="profile">
        <div className="profile__user">
          <div className="profile__info">
            <img
              className="profile__avatar"
              src={userAvatar || defaultAvatar}
              alt="User Avatar"
            />
            <p className="profile__name">{fullName}</p>
          </div>
          <div className="profile__metrics">
            <p className="profile__posts">
              {(restoIdsList || []).length} posts
            </p>
            <p className="profile__posts">
              {(followers || []).length} followers
            </p>
            <p className="profile__posts">
              {(following || []).length} following
            </p>
          </div>
          <div className="profile__location">
            <p className="profile__city">{city}</p>
            <div className="profile__signout-container">
              <img
                src={exit}
                alt="Exit"
                className="profile__signout"
                onClick={handleLogOut}
              />
            </div>
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
                key={resto.restoName}
              >
                <img
                  className="profile__post-img"
                  src={resto.restoImgs?.[0]}
                  alt="Restaurant"
                />
                <p className="profile__post-name">{resto.restoName}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
