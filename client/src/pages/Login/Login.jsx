import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import logo from "../../assets/images/plated-logo.PNG";
import "./Login.scss";
import { firebaseContext } from "../../provider/FirebaseProvider";

function Login() {
  const { signInUser } = useContext(firebaseContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Plated Login";
  }, []);

  const handleSignin = async (event) => {
    event.preventDefault();
    signInUser(event)
      .then((resp) => {
        setError(null);
      })
      .catch((err) => {
        setError("Wrong username or password");
      });
  };

  return (
    <section className="login">
      <img src={logo} alt="Plated Logo" className="login__logo"></img>
      <div className="login__container">
        <form className="login__form" name="loginForm" onSubmit={handleSignin}>
          {error && <div className="login__error">{error}</div>}
          <input
            className="login__input"
            name="emailEntry"
            type="email"
            placeholder="Email"
          />
          <input
            className="login__input"
            name="passwordEntry"
            type="password"
            placeholder="Password"
          />
          <button className="login__login" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="login__sign-up-container">
        <p className="login__sign-up">
          Don't have an account?{` `}
          <Link className="login__link" to={"/signup"}>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
