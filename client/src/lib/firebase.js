import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCUEM7OcPhYs4-ANoKIhIVF7a50NlGu0Zk",
  authDomain: "plated-d6982.firebaseapp.com",
  projectId: "plated-d6982",
  storageBucket: "plated-d6982.appspot.com",
  messagingSenderId: "1002520181849",
  appId: "1:1002520181849:web:3815f6605c96953ff10548",
};
firebase.initializeApp(config);
export const fireAuth = firebase.auth();
export const fireDB = firebase.firestore();
export const fireStorage = firebase.storage();
