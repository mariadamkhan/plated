import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { fireStorage } from "../../lib/firebase";
import { firebaseContext } from "../../provider/FirebaseProvider";
import UserInput from "../../components/UserInput/UserInput";
import Logo from "../../assets/images/plated-logo.PNG";
import "./Upload.scss";

export default function Upload() {
  const { uploadResto } = useContext(firebaseContext);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  console.log(imageAsFile);
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = fireStorage
      .ref(`/restaurants/images/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        fireStorage
          .ref("restaurants/images")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
          });
      }
    );
  };

  useEffect(() => {
    document.title = "Upload";
  }, []);

  return (
    <div className="upload">
      <div className="upload__title-container">
        <img src={Logo} className="upload__logo" alt="Plated Logo" />
        <h1 className="upload__title"> New Pick</h1>
      </div>
      <form className="upload__form" name="upload" onSubmit={uploadResto}>
        <div className="upload__left-container">
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
              onChange={handleImageAsFile}
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
            name="hours"
            //   onChange={this.handleChange}
            //   error={this.state.phoneError}
          />
          <UserInput
            label="Website"
            placeholder=" Url"
            name="url"
            //   onChange={this.handleChange}
            //   error={this.state.phoneError}
          />
        </div>
        <textarea
          type="text"
          className="upload__notes"
          name="note"
          placeholder="Add a note"
        />
        <div className="upload__button">
          <button className="upload__add" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
