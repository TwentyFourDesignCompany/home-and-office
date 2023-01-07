import React, { useState } from "react";
import how1 from "../assets/how1.png";
import how2 from "../assets/how2.png";
import how3 from "../assets/how3.png";

function HowCard({ img, title, para }) {
  return (
    <div className="how__works__section__content__card">
      <img
        src={img}
        alt="howPic"
        className="how__works__section__content__img"
      />
      <div className="how__works__section__content__card__text">
        {title}
        <span>{para}</span>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <>
      <div className="how__works__section">
        <div className="how__works__section__heading">How it works</div>
        <div className="how__works__section__para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed diam
          a dui. Lorem porttitor netus vulputat.{" "}
        </div>
        <div className="how__works__section__content">
          <HowCard
            img={how1}
            title="Purchase Securely"
            para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed diam a dui. Lorem porttito."
          />
          <HowCard
            img={how2}
            title="Ship From Warehouse"
            para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed diam a dui. Lorem porttito."
          />
          <HowCard
            img={how3}
            title="Style Your Room"
            para="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros sed diam a dui. Lorem porttito."
          />
        </div>
      </div>
    </>
  );
}
