
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import errorPic from "../assets/errorPic.png";

export default function NotFound() {
  return (
    <>
      <Header styles={{ color: "#000" }} />
      <Link to="/" className="not__found__container">
        <img
          src={errorPic}
          alt="errorPic"
          className="not__found__container__img"
        />
      </Link>
    </>
  );
}
