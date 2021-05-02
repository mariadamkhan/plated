import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "../../context/firebase";
import logo from "../../assets/images/plated-logo.PNG";
import "./Login.scss";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  //setting state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //validation
  const isInvalid = !password || !email;
  const handleSubmit = () => {};
  //insert plated logo in the title
  useEffect(() => {
    document.title = "Plated Login";
  }, []);

  return (
    <section className="login">
      <img src={logo} alt="Plated Logo" className="login__logo"></img>
      <div className="login__container">
        <form className="login__form"  name="loginForm" onSubmit={handleSubmit}>
          <input
            className="login__input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={({target}) => setEmail(target.value)} 
          />
          <input
            className="login__input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={({target}) => setPassword(target.value)} 
          />
          <button className="login__login" type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
