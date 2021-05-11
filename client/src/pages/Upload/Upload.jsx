import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { fireStorage, restImagesRef } from "../../lib/firebase";
import { firebaseContext } from "../../provider/FirebaseProvider";
import UserInput from "../../components/UserInput/UserInput";
import Logo from "../../assets/images/plated-logo.PNG";
import "./Upload.scss";

export default function Upload() {
  const { uploadResto, handleFireBaseUpload } = useContext(firebaseContext);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  useEffect(() => {
    document.title = "Upload";
  }, []);

  return (
    <div className="upload">
      <div className="upload__title-container">
        <img src={Logo} className="upload__logo" alt="Plated Logo" />
        <h1 className="upload__title"> Add New Pick</h1>
      </div>
      <form
        className="upload__form"
        name="upload"
        onSubmit={(e) => {
          uploadResto(e, imageAsFile);
        }}
      >
        <div className="upload__left-container">
          <UserInput label="Name" placeholder="Name..." name="name" />
          <UserInput placeholder=" City..." label="City" name="city" />
          <UserInput
            label="Type"
            placeholder="Type/Cuisine..."
            name="cuisine"
          />
          <>
            <div className="input">
              <label htmlFor="input-label" className="input__label">
                Image
              </label>
              <input
                type="file"
                name="image"
                className="input__input--image"
                onChange={handleImageAsFile}
              ></input>
            </div>
          </>
        </div>
        <div className="upload__right-container">
          <UserInput label="Phone" placeholder="Phone..." name="phone" />
          <UserInput label="Address" placeholder=" Address..." name="address" />
          <UserInput label="Hours" placeholder=" Hours..." name="hours" />
          <UserInput label="Url" placeholder=" Url..." name="url" />
        </div>
        <div className="upload__notes-container">
          <label htmlFor="uploadNote" className="upload__notes-label">
            Add Note
          </label>
          <textarea
            type="text"
            className="upload__notes"
            name="note"
            placeholder="Add a note..."
          />
        </div>
        <div className="upload__button">
          <button className="upload__cta" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
