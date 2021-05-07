import React from "react";
import { useContext, useEffect } from "react";
import { firebaseContext } from "../../provider/FirebaseProvider";
import UserInput from "../../components/UserInput/UserInput";
import Logo from "../../assets/images/plated-logo.PNG";

export default function Upload() {
  return (
    <div className="upload">
      <div className="upload__wrap">
        <div className="upload__left-container">
          <img src={Logo} className="uplaod__logo" alt="Plated Logo" />
          <h1 className="uplaod__title"> New Pick</h1>
        </div>
        <form
          className="upload__form"
          name="upload"
          //   onSubmit={this.handleSubmit}
        >
          <div className="upload__details-container">
            <UserInput
              label="Name"
              placeholder="Establishment name"
              name="name"
              //   onChange={this.handleChange}
              //   error={this.state.nameError}
            />
            <UserInput
              label="City"
              placeholder="City"
              name="city"
              //   onChange={this.handleChange}
              //   error={this.state.cityError}
            />
            <UserInput
              label="Type"
              placeholder="Establishment type"
              name="cuisine"
              //   onChange={this.handleChange}
              //   error={this.state.addressError}
            />
            <>
              <label htmlFor="input-label" className="input__label">
                Image
              </label>
              <input
                type="file"
                name="image"
                // className={error ? "input__error" : "input__input"}
                // onChange={onFileSelect}
              ></input>
              {/* {error && (
                <div className="error">
                  <img alt="error icon" className="error__icon" />
                  <p className="error__message">{error}</p>
                </div>
              )} */}
            </>
          </div>
          <div className="upload__right-container">
            <UserInput
              label="Phone"
              placeholder="Phone"
              name="phone"
              //   onChange={this.handleChange}
              //   error={this.state.contactNameError}
            />
            <UserInput
              label="Address"
              placeholder=" Address"
              name="address"
              //   onChange={this.handleChange}
              //   error={this.state.positionError}
            />
            <UserInput
              label="Hours"
              placeholder=" Hours"
              name="phone"
              //   onChange={this.handleChange}
              //   error={this.state.phoneError}
            />
          </div>
          <textarea
            type="text"
            className="upload__notes"
            name="uploadNotes"
            placeholder="Add a note"
          />
          <div className="upload__button">
            <button className="upload__add" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
