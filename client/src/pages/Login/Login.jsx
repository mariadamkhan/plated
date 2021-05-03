import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "../../context/firebase";
import logo from "../../assets/images/plated-logo.PNG";
import "./Login.scss";
import * as CONSTANTS from '../../constants/Constants';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  //setting state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //validation
  const isInvalid = !password || !email; //may need to take that out.
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        history.push(CONSTANTS.FEED);
    } catch (error) {
        setEmail('');
        setPassword('');
        setError(error.message);
    }
  };
  //insert plated logo in the title
  useEffect(() => {
    document.title = "Plated Login";
  }, []);

  return (
    <section className="login">
      <img src={logo} alt="Plated Logo" className="login__logo"></img>
      <div className="login__container">
        {error && <p className="error__message">{error}</p>}
        <form className="login__form" name="loginForm" onSubmit={handleLogin}>
          <input
            className="login__input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
          <input
            className="login__input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
          <button className="login__login" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="login__sign-up-container">
        <p className="login__sign-up">
          Don't have an account?{` `}
          <Link className="login__link" to={CONSTANTS.SIGN_UP}>
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
