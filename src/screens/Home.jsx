import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import main_bg from "../assets/main_bg.png";
import home_product_pic from "../assets/home_product_pic.png";
import home_product_pic2 from "../assets/home_product_pic2.jpg";
import home_product_pic3 from "../assets/home_product_pic3.jpg";
import home_product_pic4 from "../assets/home_product_pic4.jpg";
import home_product_pic5 from "../assets/home_product_pic5.jpg";
import ClientsSection from "../components/ClientsSection";
import BestSelling from "../components/BestSelling";
import FlexibilitySection from "../components/FlexibilitySection";
import HowItWorks from "../components/HowItWorks";
import TrustedCompanySection from "../components/TrustedCompanySection";
import GetOurNewLetter from "../components/GetOurNewLetter";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import HomeSection from "../components/HomeSection";

export default function Home() {
  return (
    <>
      <Header />
      <Carousel autoPlay={true} interval={5000} showStatus={false}>
        <HomeSection pic={home_product_pic} />
        <HomeSection pic={home_product_pic2} />
        <HomeSection pic={home_product_pic3} />
        <HomeSection pic={home_product_pic4} />
        <HomeSection pic={home_product_pic5} />
      </Carousel>

      <BestSelling />
      <FlexibilitySection />
      <ClientsSection />
      <GetOurNewLetter />
      <HowItWorks />
    </>
  );
}
