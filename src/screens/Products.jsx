
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Header from "../components/Header";

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

export default function Products() {
  const [select, setSelect] = useState("Furniture");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getItems(){
      try{
        let response = await fetch(`${getUrl()}/items/items`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        })

        let rs = await response.json();

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
      
    });
  }, [])

  return (
    <>
      <Header styles={{ color: "#000" }} />
      <div style={{ marginTop: "6em" }} className="best__selling__section">
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
        <div className="best__selling__section__content">
          {products.map((product, i) => (
            <ProductCard key={i} product={product}/>
          ))}
        </div>
      </div>
    </>
  );
}
