import React from 'react';
import { useContext} from "react";
import { firebaseContext, useFirebaseContext } from "../../provider/FirebaseProvider";

 const Feed = () => {
    const {
        userData,
        getAllRestaurants
      } = useContext(firebaseContext);
    return (
        <div>
            
        </div>
    )
}

export default Feed;