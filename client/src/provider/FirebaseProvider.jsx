import React, { useState, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { fireAuth, fireDB } from "../lib/firebase";
import firebase from "firebase/app";
import { kebabCase } from "lodash";

export const firebaseContext = React.createContext();

export const useFirebaseContext = () => useContext(firebaseContext);

function FirebaseProvider(props) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [restDetails, setRestDetails] = useState(null);

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
              ? setUserData({ loaded: true, userInfo: doc.data() })
              : console.error("No such document");
          })
          .catch((err) => {
            console.error("Error getting document:", err);
          });
        console.log(userData);
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
          accountCreated: firebase.firestore.Timestamp.now(),
        });
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
    event.preventDefault();
    const userEmail = event.target.emailEntry.value;
    const userPass = event.target.passwordEntry.value;
    fireAuth
      .signInWithEmailAndPassword(userEmail, userPass)
      .then((userCredential) => {
        history.push("/profile");
        console.log("Successful sign in");
        console.log(userCredential);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMsg = err.message;
        console.error(errorCode, errorMsg);
      });
  };

  //Sign Out
  const signOutUser = (event) => {
    event.preventDefault();
    fireAuth.signOut().then(() => {
      console.log("User signed out");
      setUser(null);
    });
  };

  //Restaurants

  // get one restaurant
  function getRestaurantDetails(restId) {
    fireDB
      .collection("restaurants")
      .doc(restId)
      .get()
      .then((doc) => {
        doc.exists
          ? setRestDetails({ loaded: true, restInfo: doc.data() })
          : console.error("Couldn't find restaurant details");
      })
      .catch((err) => {
        console.error(err);
      });
  }
  /**
   * get one restaurant from the database, by matching against the resto name
   * 
   * @param {string} restoNameKebab kebab-case restaurant name, e.g. pulled from the url
   */
  async function getRestaurantByName(restoNameKebab) {
    return new Promise((resolve, reject) => {
      fireDB
        .collection("restaurants")
        .get()
        // looking at ALL restuarants...
        .then((docs) => {
          docs.forEach((doc) => {
            if (!doc.exists) {
              console.error("doc doesn't exist!");
            }
            const data = doc.data()
            console.log("🚀 ~ file: FirebaseProvider.jsx ~ line 133 ~ docs.forEach ~ data", data)
            // get me the one that...?
            const isTheOneWeWant = kebabCase(data.restoName) === restoNameKebab
            console.log("🚀🚀🚀🚀🚀🚀🚀 ~ file: FirebaseProvider.jsx ~ line 135 ~ docs.forEach ~ isTheOneWeWant", isTheOneWeWant)
            // we found it!
            if(isTheOneWeWant){
              // give it back to the caller
              resolve(data)
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
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

  return (
    <firebaseContext.Provider
      value={{
        user,
        registerUser,
        signInUser,
        signOutUser,
        userData,
        getRestaurantDetails,
        getRestaurantByName,
        getManyRestaurantDetails,
        restDetails,
      }}
    >
      {props.children}
    </firebaseContext.Provider>
  );
}

export default withRouter(FirebaseProvider);
