import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState,  useEffect } from "react";
import firebase from "firebase/app";
import logo from "../../assets/images/plated-logo.PNG";
import "../SignUp/SignUp.scss";
import * as CONSTANTS from "../../constants/Constants";
import { doesUsernameExist } from "../../services/firebase";

export default function SignUp() {
  const history = useHistory();
  //setting state
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //validation
  const isInvalid = !password || !email; //may need to take that out.

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    console.log('usernameExists', usernameExists);
    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        //authentication with firebase
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        //firebase create a document
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          email: email.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(CONSTANTS.FEED);
      } catch (error) {
        setFullName("");
        setPassword("");
        setEmail("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("The username is claimed, please try another");
    }
  };
  //insert plated logo in the title
  useEffect(() => {
    document.title = "Plated Sign Up";
  }, []);

  return (
    <section className="sign-up">
      <img src={logo} alt="Plated Logo" className="sign-up__logo"></img>
      <div className="sign-up__container">
        {error && <p className="error__message">{error}</p>}
        <form
          className="sign-up__form"
          name="sign-upForm"
          onSubmit={handleSignUp}
        >
          <input
            className="sign-up__input"
            name="userName"
            type="text"
            placeholder="User Name"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
          <input
            className="sign-up__input"
            name="fullName"
            type="text"
            placeholder="Full Name"
            onChange={({ target }) => setFullName(target.value)}
            value={fullName}
          />
          <input
            className="sign-up__input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
          <input
            className="sign-up__input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button className="sign-up__login" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="sign-up__sign-up-container">
        <p className="sign-up__sign-up">
          Have an account?{` `}
          <Link className="sign-up__link" to={CONSTANTS.LOGIN}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
