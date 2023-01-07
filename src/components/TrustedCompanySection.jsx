import React, { useState } from "react";
import client from "../assets/client.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";

export default function TrustedCompanySection() {
  return (
    <>
      <div className="how__works__section">
        <div className="how__works__section__heading">
          Some of our trusted company
        </div>
        <div className="how__works__section__content">
          <img
            src={client}
            alt="trusted"
            className="trusted__section__content__img"
          />{" "}
          <img
            src={client2}
            alt="trusted"
            className="trusted__section__content__img"
          />{" "}
          <img
            src={client3}
            alt="trusted"
            className="trusted__section__content__img"
          />{" "}
          <img
            src={client4}
            alt="trusted"
            className="trusted__section__content__img"
          />{" "}
          <img
            src={client5}
            alt="trusted"
            className="trusted__section__content__img"
          />
        </div>
      </div>
    </>
  );
}
