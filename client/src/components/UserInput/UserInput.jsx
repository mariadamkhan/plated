import React from "react";

const UserInput = ({ label, name, placeholder, onChange, error }) => {
  return (
    <>
      <label htmlFor="input-label" className="input__label">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className={error ? "input__error" : "input__input"}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      {error && (
        <div className="error">
          <img  alt="error icon" className="error__icon" />
          <p className="error__message">{error}</p>
        </div>
      )}
    </>
  );
};

export default UserInput;
