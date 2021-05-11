import React from "react";
import { Link } from "react-router-dom"; //TODO: use history to be directed to the feed page
import { useContext, useEffect } from "react";
import logo from "../../assets/images/plated-logo.PNG";
import "../SignUp/SignUp.scss";
import { firebaseContext } from "../../provider/FirebaseProvider";

function SignUp() {
  const { user, registerUser, userData, signOutUser } = useContext(
    firebaseContext
  );

  useEffect(() => {
    document.title = "Plated Sign Up";
  }, []);

  return (
    <section className="sign-up">
      <img src={logo} alt="Plated Logo" className="sign-up__logo" />
      <div className="sign-up__container">
        <form
          className="sign-up__form"
          name="sign-upForm"
          onSubmit={registerUser}
        >
          <input
            className="sign-up__input"
            name="userNameEntry"
            type="text"
            placeholder="User Name"
          />
          <input
            className="sign-up__input"
            name="fullNameEntry"
            type="text"
            placeholder="Full Name"
          />
          <input
            className="sign-up__input"
            name="emailEntry"
            type="email"
            placeholder="Email"
          />
          <input
            className="sign-up__input"
            name="passwordEntry"
            type="password"
            placeholder="Password"
          />
          <button className="sign-up__login" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className="sign-up__sign-up-container">
        <p className="sign-up__sign-up">
          Have an account?{` `}
          <Link className="sign-up__link" to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
export default SignUp;
