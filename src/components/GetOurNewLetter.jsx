import React, { useState } from "react";
import client from "../assets/client.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client4 from "../assets/client4.png";
import client5 from "../assets/client5.png";

export default function GetOurNewLetter() {
  return (
    <>
      <div className="our__news__letter__section">
        <div className="how__works__section__heading">Get Our Newsletter</div>
        <div className="how__works__section__para">
          We process your personal data as stated in our Privacy Policy. You may
          withdraw your consent or manage your preferences at any time by
          clicking the unsubscribe link at the bottom of any of our marketing
          emails, or by emailing us at <span>info@homeandoffice.com.ng</span>
        </div>

        <div className="furniture__main__container__content__input__wrapper">
          <input
            type="text"
            placeholder="Enter Email"
            className="furniture__main__container__content__input"
          />
          <div className="furniture__main__container__content__svg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 38 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5532 1.00304C37.3411 0.791907 37.0731 0.64573 36.7807 0.581691C36.4884 0.517652 36.1838 0.538413 35.9029 0.641533L1.32439 13.2155C1.02618 13.3286 0.769437 13.5298 0.588263 13.7923C0.40709 14.0548 0.310059 14.3662 0.310059 14.6851C0.310059 15.0041 0.40709 15.3154 0.588263 15.5779C0.769437 15.8404 1.02618 16.0416 1.32439 16.1547L14.8257 21.5458L24.7906 11.5495L27.0068 13.7656L16.9947 23.7777L22.4015 37.279C22.518 37.5714 22.7196 37.8222 22.9802 37.9987C23.2409 38.1753 23.5485 38.2695 23.8633 38.2692C24.1809 38.2627 24.4891 38.1601 24.7472 37.9749C25.0054 37.7897 25.2013 37.5306 25.3093 37.2318L37.8833 2.65337C37.9904 2.37529 38.0162 2.0725 37.9577 1.7803C37.8993 1.4881 37.759 1.21854 37.5532 1.00304Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
