import React from "react";
import Soon from "../../assets/images/soon.PNG";
import "./BucketList.scss";

const BucketList = () => {
  return (
    <>
      <div className="coming-soon">
        <img src={Soon} alt="Coming Soon" className="coming-soon__img" />
      </div>
    </>
  );
};

export default BucketList;
