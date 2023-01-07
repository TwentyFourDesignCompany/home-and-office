import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Navigation} from "swiper";
import ProductCard from "./ProductCard";
import {Link} from "react-router-dom";
import ProductPic1 from "../assets/prodictPic1.png";
import ProductPic2 from "../assets/prodictPic2.png";
import ProductPic3 from "../assets/prodictPic3.png";
import ProductPic4 from "../assets/prodictPic4.png";

import {getUrl} from "../helper/url-helper";

function TabButton({ setSelect, label, select }) {
  return (
    <button
      onClick={() => {
        setSelect(label);
      }}
      className={
        select === label
          ? "best__selling__section__tab best__selling__section__tab_active"
          : "best__selling__section__tab"
      }
    >
      {label}
    </button>
  );
}

export default function BestSelling() {
  const [select, setSelect] = useState("Furniture");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getItems(){
      try{
        let response = await fetch(`${getUrl()}/items/limit/6`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })

        let rs = await response.json();

        console.log(rs)
        if (rs.length){
          setProducts(rs);
        } else {
          console.log(rs);
        }
      } catch(err){
        console.log(err);
      }
    }  
    
    getItems().then(d => {
      console.log(d);
    });
  }, [])

  return (
    <>
      <div className="best__selling__section">
        <div className="best__selling__heading">Best Selling Products</div>
        <div className="best__selling__section__tabs_container">
          <TabButton label="Furniture" select={select} setSelect={setSelect} />
          <TabButton label="Lights" select={select} setSelect={setSelect} />
          <TabButton
            label="Smart Home Gadgets"
            select={select}
            setSelect={setSelect}
          />
          <TabButton
            label="Home Security Gadgets"
            select={select}
            setSelect={setSelect}
          />
          <TabButton label="Gadgets" select={select} setSelect={setSelect} />
          <TabButton
            label="Home Decoration"
            select={select}
            setSelect={setSelect}
          />
        </div>
        <div className="swiper_wrapper">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            slidesPerGroup={3}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              // when window width is >= 640px
              380: {
                width: 380,
                slidesPerView: 2,
              },
              1250: {
                width: 1250,
                slidesPerView: 4,
              },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {products.map((product, i) => (
              <SwiperSlide key={i}>
                <ProductCard product={product}/>
              </SwiperSlide>
            ))}
          </Swiper>
          <Link
            to="/product"
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
            }}
            className="product_container_card_view"
          >
            View All
          </Link>
        </div>
      </div>
    </>
  );
}
