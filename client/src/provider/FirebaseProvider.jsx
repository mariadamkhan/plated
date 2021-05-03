import React,{useState,useEffect,useContext} from 'react';
import {fireAuth,fireDB} from '../lib/firebase';
import firebase from 'firebase/app';

export const firebaseContext = React.createContext();

export const useFirebaseContext = ()=>useContext(firebaseContext)

function FirebaseProvider(props) {
const [user, setUser] = useState(null);
const [userData, setUserData] = useState(null);
const [restDetails, setRestDetails] = useState(null);

  useEffect(() => {
    fireAuth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log(userAuth);
        console.log('User logged in!');
        setUser(userAuth)

        fireDB.collection("users").doc(userAuth.uid).get()
        .then(doc => {
          doc.exists?
          setUserData({loaded:true,userInfo: doc.data()})
          :
          console.error('No such document')
        }).catch(err => {
          console.error("Error getting document:", err);
        })
        console.log(userData);
      }
    })
  }, [])

  const registerUser = event => {
    event.preventDefault();
    const userEmail = event.target.emailEntry.value;
    const userPass = event.target.passEntry.value;
    const firstName = event.target.firstNameEntry.value;
    const lastName = event.target.lastNameEntry.value;
    fireAuth.createUserWithEmailAndPassword(userEmail, userPass)
    .then(userCredential => {
      const user = userCredential.user;
      fireDB.collection("users").doc(user.uid).set({
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        accountCreated: firebase.firestore.Timestamp.now(),
        favColor: 'red'
      })
    }).catch(err =>{
      console.error(`Looks like there was an error with the sign-up process: ${err}`);
    })
  }

  const signInUser = async (username,password) => {
 return new Promise(async (resolve,reject)=>{
  try {
    
    const userCredential = await fireAuth.signInWithEmailAndPassword(username, password)
    console.log('Successful sign in');
    console.log(userCredential);
    // navigate to dashboard / landing page
    resolve()
  } catch (err) {
    const errorCode = err.code;
    const errorMsg = err.message;
    console.error(errorCode,errorMsg);
    
    reject({err})
  } 
 })
  
  }

  const signOutUser = event => {
    event.preventDefault();
    fireAuth.signOut().then(()=> {
      console.log('User signed out');
      setUser(null);
    })
  }

  function getRestaurantDetails(restId) {
    fireDB.collection("restaurants").doc(restId).get()
    .then(doc => {
      doc.exists?
      setRestDetails({loaded: true, restInfo: doc.data()})
      :
      console.error("Couldn't find restaurant details");
    }).catch(err =>{
      console.error(err);
    })

  }

  return (
    <firebaseContext.Provider value={{user, registerUser, signInUser, signOutUser,userData, getRestaurantDetails, restDetails}}>
      {props.children}
    </firebaseContext.Provider>
  )
}

export default FirebaseProvider;