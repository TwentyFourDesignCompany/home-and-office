import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header({ styles }) {
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setIsHeaderOpen(true);
    } else {
      setIsHeaderOpen(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        setIsHeaderOpen(true);
      } else {
        setIsHeaderOpen(false);
      }
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header__wrapper">
        <Link to="/">
          <img src={logo} className="brand__logo" alt="img" />
        </Link>
        <button
          className="header__mobile__btn"
          onClick={() => {
            isHeaderOpen ? setIsHeaderOpen(false) : setIsHeaderOpen(true);
          }}
        >
          {isHeaderOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
        {isHeaderOpen ? (
          <div className="nav">
            <div className="nav__link">
              <input
                type="radio"
                id="home"
                className="nav__link__input"
                name="nav__link__input"
                onClick={() => {
                  navigate("/about");
                }}
              />
              <div style={styles} className="nav__link__content">
                About
              </div>
            </div>
            <div className="nav__link">
              <input
                type="radio"
                id="about"
                className="nav__link__input"
                name="nav__link__input"
                onClick={() => {
                  navigate("/products");
                }}
              />
              <div style={styles} className="nav__link__content">
                Shop
              </div>
            </div>
            <div className="nav__link">
              <input
                type="radio"
                id="about"
                className="nav__link__input"
                name="nav__link__input"
                onClick={() => {
                  navigate("/contact-us");
                }}
              />
              <div style={styles} className="nav__link__content">
                Contact Us
              </div>
            </div>
            <div className="nav__link">
              <input
                type="radio"
                id="about"
                className="nav__link__input"
                name="nav__link__input"
                onClick={() => {
                  navigate("/cart");
                }}
              />
              <div className="nav__link__content__svg">
                <svg
                  width="51"
                  height="51"
                  viewBox="0 0 51 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="51" height="51" rx="25.5" fill="#E3810E" />
                  <g clipPath="url(#clip0_0_1)">
                    <path
                      d="M35.713 17.077C35.4317 16.7394 35.0796 16.468 34.6815 16.2818C34.2835 16.0957 33.8494 15.9995 33.41 16H17.242L17.2 15.649C17.114 14.9194 16.7634 14.2467 16.2145 13.7585C15.6656 13.2702 14.9566 13.0003 14.222 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14C13 14.2652 13.1054 14.5196 13.2929 14.7071C13.4804 14.8946 13.7348 15 14 15H14.222C14.4669 15 14.7033 15.09 14.8864 15.2527C15.0694 15.4155 15.1863 15.6397 15.215 15.883L16.591 27.583C16.7339 28.7998 17.3185 29.9218 18.2339 30.736C19.1493 31.5502 20.3319 32 21.557 32H32C32.2652 32 32.5196 31.8946 32.7071 31.7071C32.8946 31.5196 33 31.2652 33 31C33 30.7348 32.8946 30.4804 32.7071 30.2929C32.5196 30.1054 32.2652 30 32 30H21.557C20.9381 29.9983 20.3348 29.8051 19.8299 29.4471C19.3251 29.089 18.9433 28.5835 18.737 28H30.657C31.8293 28.0001 32.9643 27.5882 33.8638 26.8364C34.7633 26.0846 35.37 25.0407 35.578 23.887L36.363 19.533C36.4414 19.101 36.4237 18.6571 36.3114 18.2326C36.1991 17.8082 35.9948 17.4137 35.713 17.077V17.077Z"
                      fill="white"
                    />
                    <path
                      d="M20 37C21.1046 37 22 36.1046 22 35C22 33.8954 21.1046 33 20 33C18.8954 33 18 33.8954 18 35C18 36.1046 18.8954 37 20 37Z"
                      fill="white"
                    />
                    <path
                      d="M30 37C31.1046 37 32 36.1046 32 35C32 33.8954 31.1046 33 30 33C28.8954 33 28 33.8954 28 35C28 36.1046 28.8954 37 30 37Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_1">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(13 13)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
