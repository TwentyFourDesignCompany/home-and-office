import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_container_wrapper">
        <div className="footer_container_wrapper_col">
          <Link
              to="/"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
          >
            <img
                src={Logo}
                alt="Logo"
                className="footer_container_wrapper_col_logo"
            />
          </Link>
          <a href="" className="footer_container_wrapper_col_entry">
            Home
          </a>
          <a href="" className="footer_container_wrapper_col_entry">
            Product
          </a>
          <a href="" className="footer_container_wrapper_col_entry">
            Category
          </a>
          <a href="" className="footer_container_wrapper_col_entry">
            About
          </a>
        </div>
        <div className="footer_container_wrapper_col">
          <a href="" className="footer_container_wrapper_col_entry">
            About
          </a>
          <a href="" className="footer_container_wrapper_col_entry">
            Our Story
          </a>
          <a href="" className="footer_container_wrapper_col_entry">
            Benefits
          </a>{" "}
          <a href="" className="footer_container_wrapper_col_entry">
            Team
          </a>{" "}
          <a href="" className="footer_container_wrapper_col_entry">
            Careers
          </a>
        </div>
        <div className="footer_container_wrapper_col">
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="footer_container_wrapper_col_btn"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="24" fill="#E3810E" />
              <path
                d="M30 27L24 21L18 27"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
