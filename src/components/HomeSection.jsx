import React, { useState } from "react";
import main_bg from "../assets/main_bg.png";
import home_product_pic from "../assets/home_product_pic.png";

export default function HomeSection({ pic }) {
  return (
    <>
      <div className="furniture__main__container">
        <img
          src={main_bg}
          alt="main_bg"
          className="furniture__main__container__img"
        />
        <div className="furniture__main__container__overlay">
          <div className="furniture__main__container__content">
            <div className="furniture__main__container__left">
              <div className="furniture__main__container__content__heading">
                <span>Fast. Easy. Value. Turnkey.</span>
                Make Your Interior More Minimalistic & Modern
              </div>
              <div className="furniture__main__container__content__para">
                We empower you to create your dream space by offering a curated
                shopping experience, design and installation services. With our
                office and home furniture collections. <br /> we’ll be able to
                help you create a modern, practical, and effective space that
                supports your work and daily living. Our unique,
                manufacturer-direct model means you get high-quality products
                and phenomenal service, while saving time and money
              </div>
              {/*<div className="furniture__main__container__content__input__wrapper">*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    placeholder="Start Shopping"*/}
              {/*    className="furniture__main__container__content__input"*/}
              {/*  />*/}
              {/*  <div className="furniture__main__container__content__svg">*/}
              {/*    <svg*/}
              {/*      width="24"*/}
              {/*// height="24" // viewBox="0 0 24 24" // fill="none"*/}
              {/*      xmlns="http://www.w3.org/2000/svg"*/}
              {/*    >*/}
              {/*      <path*/}
              {/*        d="M21 21L16.514 16.506M19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z"*/}
              {/*        stroke="white"*/}
              {/*        strokeWidth="2"*/}
              {/*        strokeLinecap="round"*/}
              {/*      />*/}
              {/*    </svg>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <button className="primary__btn button">Start Shopping</button>
            </div>
            <div className="furniture__main__container__right">
              <img
                src={pic}
                alt="home_product_pic"
                className="furniture__main__container__right__img"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
