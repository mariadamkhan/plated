import React, { useState, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { fireAuth, fireDB, restImagesRef } from "../lib/firebase";
import firebase from "firebase/app";
import { getOneRestoByNameFromFirebase } from "./getOneRestoByNameFromFirebase";
import { v4 } from "uuid";

export const firebaseContext = React.createContext();

export const useFirebaseContext = () => useContext(firebaseContext);

function FirebaseProvider(props) {
  // TODO: deduplicate these?
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  /** appears on Profile page */
  const [profileRestosList, setProfileRestosList] = useState([]);

  /** appears on Restaurant page */
  const [restDetails, setRestDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fireAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        console.log("User logged in!");
        setUser(userAuth);

        fireDB
          .collection("users")
          .doc(userAuth.uid)
          .get()
          .then((doc) => {
            doc.exists
              ? setUserData({
                  loaded: true,
                  userInfo: doc.data(),
                  userId: doc.id,
                })
              : console.error("No such document");
          })
          .catch((err) => {
            console.error("Error getting document:", err);
          });
      }
    });
  }, []);

  const history = useHistory();
  //register user
  const registerUser = (event) => {
    event.preventDefault();
    const userEmail = event.target.emailEntry.value;
    const userPass = event.target.passwordEntry.value;
    const fullName = event.target.fullNameEntry.value;
    const userName = event.target.userNameEntry.value;
    fireAuth
      .createUserWithEmailAndPassword(userEmail, userPass)
      .then((userCredential) => {
        console.log("Successful sign in");
        console.log(userCredential);
        const user = userCredential.user;
        fireDB.collection("users").doc(user.uid).set({
          email: user.email,
          fullName: fullName,
          userName: userName,
          followers: [],
          following: [],
          restoList: [],
          accountCreated: firebase.firestore.Timestamp.now(),
        });
        setUser(user);
        history.push("/profile");
      })
      .catch((err) => {
        console.error(
          `Looks like there was an error with the sign-up process: ${err}`
        );
      });
  };

  //Login User
  const signInUser = (event) => {
    return new Promise((resolve, reject) => {
      const userEmail = event.target.emailEntry.value;
      const userPass = event.target.passwordEntry.value;
      fireAuth
        .signInWithEmailAndPassword(userEmail, userPass)
        .then((userCredential) => {
          resolve(true); // success
          history.push("/profile");
          console.log("Successful sign in");
          console.log(userCredential);
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMsg = err.message;
          console.error(errorCode, errorMsg);
          reject(err);
        });
    });
  };

  //Log Out
  const signOutUser = () => {
    // log out from auth
    fireAuth.signOut().then(() => {
      console.log("User signed out");
      setUser(null);
      setUserData(null);
    });
  };

  //get restaurant by name (clicking on the picture of the restaurant )
  async function getRestaurantByName(restoNameKebab) {
    return new Promise((resolve, reject) => {
      getOneRestoByNameFromFirebase(restoNameKebab, resolve);
    });
  }
  // get multiple restaurants
  async function getManyRestaurantDetails(restIds) {
    let restos = [];
    return new Promise((resolve, reject) => {
      fireDB
        .collection("restaurants")
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (!doc.exists) {
              console.error("doc doesn't exist!");
            }
            if (restIds.includes(doc.id)) {
              const data = doc.data();
              restos = [...restos, data];
            }
            const done = restos.length === restIds.length;
            if (done) {
              resolve(restos);
            }
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  // Upload new restaurant
  const uploadResto = (event, file) => {
    event.preventDefault();
    handleFireBaseUpload(file).then((url) => {
      const restoImg = url;
      const restoName = event.target.name.value;
      const restoCity = event.target.city.value;
      const restoCuisine = event.target.cuisine.value;
      const restoPhone = event.target.phone.value;
      const restoAddress = event.target.address.value;
      const restoHours = event.target.hours.value;
      const restoUrl = event.target.url.value;
      const restoNotes = event.target.note.value;
      fireDB
        .collection("restaurants")
        .add({
          restoImgs: [restoImg],
          restoName: restoName,
          restoCity: restoCity,
          restoCuisine: restoCuisine,
          restoPhone: restoPhone,
          restoAddress: restoAddress,
          restoHours: restoHours,
          restoUrl: restoUrl,
          restoNotes: restoNotes,
          uploadCreated: firebase.firestore.Timestamp.now(),
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          const userDoc = fireDB.collection("users").doc(userData.userId);
          userDoc
            .update({
              restoList: [...userData.userInfo.restoList, docRef.id],
            })
            .then(() => {
              history.push("/profile");
            });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  };
  const handleFireBaseUpload = (file) => {
    console.log(file);
    // async magic goes here...
    const metadata = {
      contentType: file.type,
    };
    let fileType = file.type.split("/")[1];
    const uploadTask = restImagesRef
      .child(`${v4()}.${fileType}`)
      .put(file, metadata);
    return uploadTask.then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    });
  };

  async function getAllRestaurants() {
    const snapshot = await firebase.firestore().collection("restaurants").get();
    return snapshot.docs.map((doc) => doc.data());
  }
  return (
    <firebaseContext.Provider
      value={{
        user,
        registerUser,
        signInUser,
        signOutUser,
        userData,
        getRestaurantByName,
        getManyRestaurantDetails,
        restDetails,
        uploadResto,
        handleFireBaseUpload,
        getAllRestaurants,

        profileRestosList,
        setProfileRestosList,
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
}

export default withRouter(FirebaseProvider);
