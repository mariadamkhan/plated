import React, { useState } from "react";
import { firebaseContext, useFirebaseContext } from "../../provider/FirebaseProvider";
import { useContext, useEffect } from "react";

const Profile = () => {
  const { userData, getRestaurantDetails, restDetails } = useContext(
    firebaseContext
  );
  console.log(restDetails);
  console.log(
    "🚀 ~ file: Profile.jsx ~ line 11 ~ Profile ~ userData",
    userData
  );

  const ready = Boolean(userData?.userInfo) 

  return !ready ? null : (
    <ProfileContent {...{userInfo: userData.userInfo}}/>
  );
};

export default Profile;

function ProfileContent({userInfo}){

const [restosList, setRestosList] = useState([])

const {email, fullName, restoList: restoIdsList, following, followers} = userInfo

const {getManyRestaurantDetails} = useFirebaseContext()

// fetch many restaurants on mount
useEffect(()=>{
 getManyRestaurantDetails(restoIdsList)
 .then((resp)=>{
     console.log("🚀 ~ file: Profile.jsx ~ line 36 ~ .then ~ resp", resp)
     setRestosList(resp)})
},[restoIdsList])

return <div>
{/* profile section, incl image + user data */}
<div className="profileGrid">
  <div className="avatar">
    <img src={"https://picsum.photos/500/500"} alt="" />
  </div>
  <div className="userInfo">
    <div className="username">{fullName}</div>
    <div className="metadata">
      <div className="followerCount">{followers.length}</div>
      <div className="followingCount">{following.length}</div>
      <div className="postsNumber">{restoIdsList.length}</div>
    </div>
  </div>
</div>

{/* restaurants grid */}
<div className="restaurantsGrid">
    {restosList.map((resto)=>{
return <div className="restoItem">

</div>
    })}
</div>
</div>
}