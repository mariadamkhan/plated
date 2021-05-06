import React from "react";
import Image from "../../assets/images/dandy.jpeg";
import { useParams } from "react-router-dom";
import './RestoInfo.scss';

export default function RestoInfo() {
  const { restNameKebab } = useParams();
  // TODO: const  {getRestByKebabName(restNameKebab)} = useFirebaseContext()
  return (
    <section class="resto">
      <div className="resto__wrap-img">
        <img className="resto__img" src={Image} />
      </div>
      <div className="resto__wrap-details">
        <h1 className="resto__name">Dandy</h1>
        <div className="resto__container-location">
          <p className="resto__city">Montreal</p>
          <p className="resto__cuisine">Breakfas + Brunch</p>
        </div>
        <div className="resto__container-about">
            <p className="resto__heading-hours">Hours</p>
          <p className="resto__hours"> 
          Tuesday 4–9p.m. Wednesday 4–9p.m. Thursday 4–9p.m. Friday 4–9p.m.
            Saturday 12–9p.m. Sunday 12–9p.m. Monday 4–9p.m.
          </p>
          <div className="resto__contact">
            <p className="resto__phone">(514) 289-9996</p>
            <p className="resto__email">dandymtl.com</p>
            <p className="resto__address">
              "244 Rue Saint-Jacques Montréal, QC H2Y 1L9"
            </p>
          </div>
          <p className="resto__notes">
            Had the chia bowl and the ricotta pancakes with brown butter maple
            sauce and Meyer lemon cream, both of which were awesome.
          </p>
        </div>
      </div>
    </section>
  );
}
