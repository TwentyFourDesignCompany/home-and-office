import React, { useState } from "react";
import flexibility from "../assets/flexibility.png";

export default function FlexibilitySection() {
  return (
    <>
      <div className="flexibility__section">
        <div className="flexibility__section__left">
          <img
            src={flexibility}
            alt="flexibility_pic"
            className="flexibility__section__left__img"
          />
        </div>
        <div className="flexibility__section__right">
          <div className="flexibility__section__heading">
            Flexbility and options to suits your lifestyle
          </div>
          <div className="flexibility__section__para">
            You need it? We got it. We make your finding your next home easy,
            comfortable, and simple. From our happiness guarantee to our
            selective roommate finder option. We provide you the flexibility
            that you most desire
          </div>
          <button className="flexibility__section__btn">Search Product</button>
        </div>
      </div>
    </>
  );
}
