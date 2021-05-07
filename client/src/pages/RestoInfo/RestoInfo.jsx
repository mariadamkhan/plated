import React, { useEffect, useState } from "react";
import Image from "../../assets/images/dandy.jpeg";
import { useParams } from "react-router-dom";
import "./RestoInfo.scss";
import { useFirebaseContext } from "../../provider/FirebaseProvider";
import Phone from "../../assets/images/phone.PNG";
import Location from "../../assets/images/location.PNG";
import Web from "../../assets/images/web.PNG";
import Quill from "../../assets/icons/quill.svg";

export default function RestoInfo() {
  const { restoNameKebab } = useParams();
  const { getRestaurantByName } = useFirebaseContext();

  const [resto, setResto] = useState(null);
  console.log("🚀 ~ file: RestoInfo.jsx ~ line 11 ~ RestoInfo ~ resto", resto);

  // on mount, fetch the restaurant from db and save it to state
  useEffect(() => {
    getRestaurantByName(restoNameKebab)
      .then((r) => {
        setResto(r);
      })
      .catch(console.log);
  }, []);

  return !resto ? null : (
    <section className="resto">
      <div className="resto__wrap-img">
        <img className="resto__img" src={resto.restoImgs[0]} />
      </div>
      <div className="resto__wrap-details">
        <div className="resto__name-container">
          <h1 className="resto__name">{resto.restoName}</h1>
          <img className="resto__edit" src={Quill} alt="Quill Icon" />
        </div>
        <div className="resto__container-location">
          <p className="resto__city">{resto.restoCity}</p>
          <p className="resto__cuisine">{resto.restoCuisine}</p>
        </div>
        <div className="resto__container-about">
          <div className="resto__hours-container">
            <p className="resto__heading-hours">Hours</p>
            <p className="resto__hours">{resto.restoHours}</p>
          </div>
          <div className="resto__contact">
            <div className="resto__contact-container">
              <img className="resto__icon" src={Phone} alt="Phone Icon" />
              <p className="resto__contact-info">(514) 289-9996</p>
            </div>
            <div className="resto__contact-container">
              <img className="resto__icon" src={Web} alt="Web Icon" />
              <p className="resto__contact-info">dandymtl.com</p>
            </div>
            <div className="resto__contact-container">
              <img className="resto__icon" src={Location} alt="Web Icon" />
              <p className="resto__contact-info">{resto.restoAddress}</p>
            </div>
          </div>
          <div className="resto__notes-container">
            <p className="resto__heading-hours">Notes</p>
            <p className="resto__notes">{resto.restoNotes}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
