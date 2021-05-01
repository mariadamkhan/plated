import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCUEM7OcPhYs4-ANoKIhIVF7a50NlGu0Zk",
  authDomain: "plated-d6982.firebaseapp.com",
  projectId: "plated-d6982",
  storageBucket: "plated-d6982.appspot.com",
  messagingSenderId: "1002520181849",
  appId: "1:1002520181849:web:3815f6605c96953ff10548",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
