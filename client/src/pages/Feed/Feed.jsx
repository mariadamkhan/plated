import React from "react";
import Header from "../../components/Header/Header";
import Berlin from "../../assets/images/demo-feed/Berlin.png";
import Oxford from "../../assets/images/demo-feed/oxford.png";
import Moscow from "../../assets/images/demo-feed/moscow.png";
import Vin from "../../assets/images/demo-feed/vin.png";
import Dandy from "../../assets/images/demo-feed/dandy.jpeg";
import Bar from "../../assets/images/demo-feed/bar.png";
import Elena from "../../assets/images/demo-feed/elena.png";
import Larry from "../../assets/images/demo-feed/larry.png";

import Bob from "../../assets/images/demo-feed/bob.png";
import Hannah from "../../assets/images/demo-feed/hannah.jpeg";
import Felicia from "../../assets/images/demo-feed/felicia.png";
import "./Feed.scss";

/// CREATED SOLELY FOR DEMO! ///

const Feed = () => {
  return (
    <section className="feed">
      <Header />
      <div className="feed__card">
        <img src={Larry} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Felicia} alt="User Avatar" />
          <p className="feed__resto-name">Larry's</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Elena} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Felicia} alt="User Avatar" />
          <p className="feed__resto-name">Elena</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Moscow} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Hannah} alt="User Avatar" />
          <p className="feed__resto-name">Wine & Crab</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Berlin} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Bob} alt="User Avatar" />
          <p className="feed__resto-name">893 Ryōtei</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Bar} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Hannah} alt="User Avatar" />
          <p className="feed__resto-name">Bar Isabel</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Dandy} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Felicia} alt="User Avatar" />
          <p className="feed__resto-name">Dandy</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Vin} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Felicia} alt="User Avatar" />
          <p className="feed__resto-name">Vin Papillon</p>
        </div>
      </div>
      <div className="feed__card">
        <img src={Oxford} className="feed__img" alt="Restaurant" />
        <div className="feed__user-container">
          <img className="feed__avatar" src={Hannah} alt="User Avatar" />
          <p className="feed__resto-name">Eagle and Child</p>
        </div>
      </div>
    </section>
  );
};

export default Feed;
