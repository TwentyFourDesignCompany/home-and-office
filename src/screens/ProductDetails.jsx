
import React, { useState, useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import CurrencyDisplay from "react-currency-format";

import ProductCard from "../components/ProductCard";
import LoggedInHeader from "../components/LoggedInHeader";
import PaymentModal from "../components/PaymentModal";

import {getUrl} from "../helper/url-helper";
import {addItem} from "../helper/cart-helper";

function SuggestionImg({imgURL, onClick, index}) {
  return (
    <button
      className="product__details__images__suggestion__btn"
      onClick={() => onClick(index)}
    >
      <img
        src={imgURL}
        alt="product__details__images__suggestion1"
        className="product__details__images__suggestion"
      />
    </button>
  );
}

function Discription({ title }) {
  return (
    <div className="product__details__content__variant__description">
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5835 7.85098C16.9345 8.20193 16.9345 8.77082 16.5835 9.1216L10.5563 15.149C10.2053 15.4998 9.63662 15.4998 9.28567 15.149L6.41646 12.2796C6.06551 11.9289 6.06551 11.36 6.41646 11.0092C6.76723 10.6582 7.33613 10.6582 7.6869 11.0092L9.92089 13.2432L15.3129 7.85098C15.6639 7.5002 16.2328 7.5002 16.5835 7.85098ZM23 11.5C23 17.8566 17.8557 23 11.5 23C5.14338 23 0 17.8557 0 11.5C0 5.14338 5.14426 0 11.5 0C17.8566 0 23 5.14426 23 11.5ZM21.2031 11.5C21.2031 6.13657 16.8627 1.79688 11.5 1.79688C6.13657 1.79688 1.79688 6.13728 1.79688 11.5C1.79688 16.8634 6.13728 21.2031 11.5 21.2031C16.8634 21.2031 21.2031 16.8627 21.2031 11.5Z"
          fill="black"
        />
      </svg>
      {title}
    </div>
  );
}

export default function ProductDetails(){
  const [product, setProduct] = useState({images: []});
  const [similarProducts, setSimilarProducts] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    async function getItem(){
      try{
        let response = await fetch(`${getUrl()}/items/get-product/${id}`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        })

        let rs = await response.json();

        console.log(rs);
        if (rs){
          setProduct(rs);
        } else {
          console.log(rs);
        }
      } catch(err){
        console.log(err);
      }
    }  
    
    getItem().then(d => {

    });

    async function getSimilarItems(){
      try{
        let response = await fetch(`${getUrl()}/items/limit/3`, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        })

        let rs = await response.json();

        console.log(rs)
        if (rs.length){
          console.log(rs);
          setSimilarProducts(rs);
        } else {
          console.log(rs);
        }
      } catch(err){
        console.log(err);
      }
    }  
    
    getSimilarItems().then(d => {
      console.log(d);
    });
  }, [id])

  function changeImage(index){
    let tempImgs = [...product.images];
    let im = tempImgs.splice(index, 1);
    setProduct({...product, images: [...im, ...tempImgs]});
  }

  return (
    <>
      <LoggedInHeader />
      <div className="container product__details">
        <div className="product__details__top__row">
          <div className="product__details__images">
            <div className="product__details__image">
              <img
                src={product.images[0]?.url}
                alt="HomeBG"
                className="product__details__image__pic"
              />
            </div>
          </div>
          <div className="product__details__content">
            <div className="product__details__content__heading__row">
              <div className="product__details__content__heading__row__heading">
                {product.productName}
              </div>
            </div>
            <svg
              width="160"
              height="32"
              viewBox="0 0 160 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1631 4.26548C14.8573 2.65355 17.1427 2.65356 17.8369 4.26548L19.8564 8.95491C20.1459 9.62726 20.7797 10.0877 21.5086 10.1553L26.5925 10.6268C28.3401 10.7889 29.0463 12.9625 27.7278 14.1208L23.892 17.4906C23.342 17.9737 23.0999 18.7187 23.2609 19.4329L24.3835 24.4137C24.7693 26.1258 22.9203 27.4692 21.4113 26.5731L17.0211 23.9663C16.3917 23.5926 15.6083 23.5926 14.9789 23.9663L10.5887 26.5731C9.07966 27.4692 7.23066 26.1258 7.61654 24.4137L8.73912 19.4329C8.90007 18.7187 8.658 17.9737 8.10803 17.4906L4.27217 14.1208C2.95365 12.9625 3.65991 10.7889 5.40745 10.6268L10.4914 10.1553C11.2203 10.0877 11.8541 9.62726 12.1436 8.95491L14.1631 4.26548Z"
                fill="#F2C94C"
              />
              <path
                d="M46.1631 4.26548C46.8573 2.65355 49.1427 2.65356 49.8369 4.26548L51.8564 8.95491C52.1459 9.62726 52.7797 10.0877 53.5086 10.1553L58.5925 10.6268C60.3401 10.7889 61.0463 12.9625 59.7278 14.1208L55.892 17.4906C55.342 17.9737 55.0999 18.7187 55.2609 19.4329L56.3835 24.4137C56.7693 26.1258 54.9203 27.4692 53.4113 26.5731L49.0211 23.9663C48.3917 23.5926 47.6083 23.5926 46.9789 23.9663L42.5887 26.5731C41.0797 27.4692 39.2307 26.1258 39.6165 24.4137L40.7391 19.4329C40.9001 18.7187 40.658 17.9737 40.108 17.4906L36.2722 14.1208C34.9537 12.9625 35.6599 10.7889 37.4074 10.6268L42.4914 10.1553C43.2203 10.0877 43.8541 9.62726 44.1436 8.95491L46.1631 4.26548Z"
                fill="#F2C94C"
              />
              <path
                d="M78.1631 4.26548C78.8573 2.65355 81.1427 2.65356 81.8369 4.26548L83.8564 8.95491C84.1459 9.62726 84.7797 10.0877 85.5086 10.1553L90.5925 10.6268C92.3401 10.7889 93.0463 12.9625 91.7278 14.1208L87.892 17.4906C87.342 17.9737 87.0999 18.7187 87.2609 19.4329L88.3835 24.4137C88.7693 26.1258 86.9203 27.4692 85.4113 26.5731L81.0211 23.9663C80.3917 23.5926 79.6083 23.5926 78.9789 23.9663L74.5887 26.5731C73.0797 27.4692 71.2307 26.1258 71.6165 24.4137L72.7391 19.4329C72.9001 18.7187 72.658 17.9737 72.108 17.4906L68.2722 14.1208C66.9537 12.9625 67.6599 10.7889 69.4074 10.6268L74.4914 10.1553C75.2203 10.0877 75.8541 9.62726 76.1436 8.95491L78.1631 4.26548Z"
                fill="#F2C94C"
              />
              <path
                d="M110.163 4.26548C110.857 2.65355 113.143 2.65356 113.837 4.26548L115.856 8.95491C116.146 9.62726 116.78 10.0877 117.509 10.1553L122.593 10.6268C124.34 10.7889 125.046 12.9625 123.728 14.1208L119.892 17.4906C119.342 17.9737 119.1 18.7187 119.261 19.4329L120.383 24.4137C120.769 26.1258 118.92 27.4692 117.411 26.5731L113.021 23.9663C112.392 23.5926 111.608 23.5926 110.979 23.9663L106.589 26.5731C105.08 27.4692 103.231 26.1258 103.617 24.4137L104.739 19.4329C104.9 18.7187 104.658 17.9737 104.108 17.4906L100.272 14.1208C98.9537 12.9625 99.6599 10.7889 101.407 10.6268L106.491 10.1553C107.22 10.0877 107.854 9.62726 108.144 8.95491L110.163 4.26548Z"
                fill="#F2C94C"
              />
              <path
                d="M142.163 4.26548C142.857 2.65355 145.143 2.65356 145.837 4.26549L147.856 8.95491C148.146 9.62726 148.78 10.0877 149.509 10.1553L154.593 10.6268C156.34 10.7889 157.046 12.9625 155.728 14.1208L151.892 17.4906C151.342 17.9737 151.1 18.7187 151.261 19.4329L152.383 24.4137C152.769 26.1258 150.92 27.4692 149.411 26.5731L145.021 23.9663C144.392 23.5926 143.608 23.5926 142.979 23.9663L138.589 26.5731C137.08 27.4692 135.231 26.1258 135.617 24.4137L136.739 19.4329C136.9 18.7187 136.658 17.9737 136.108 17.4906L132.272 14.1208C130.954 12.9625 131.66 10.7889 133.407 10.6268L138.491 10.1553C139.22 10.0877 139.854 9.62726 140.144 8.95491L142.163 4.26548Z"
                fill="#C4C4C4"
              />
            </svg>
            <div className="main__product__content__price">
              <div>
                <span style={{textDecoration: "line-through"}}>
                <CurrencyDisplay 
                  value={Number(product.price * 1.2)} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'₦'} 
                  renderText={value => <div>{value}</div>} />
                </span>
              </div>
              <div>
                <span>price</span>
                <CurrencyDisplay 
                  value={Number(product.price)} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={'₦'} 
                  renderText={value => <div>{value}</div>} />
              </div>
            </div>
            <div className="product__details__content__variant">
              <pre className="p-details">
                {product.details}
              </pre>
              {/** <Discription title="Free Return" />
              <Discription title="Chat with us 24 hours" />
              <Discription title="Comes with a Package" />
              <Discription title="Comes with a Package" />*/}
            </div>
            <div className="main__product__content__row">
              <button to="/cart"
                className="main__product__content__row__text"
                style={{border: "none", backgroundColor: "transparent"}}
                onClick={() => addItem(product)}
              >
                Add to Cart
              </button>
              <PaymentModal product={product}/>
            </div>
          </div>
        </div>
        <div className="">
          {product.images.map((img, i) => {
            if (i === 0){
              return "";
            } else {
              return <SuggestionImg
                key={i}
                imgURL={product.images[i]?.url}
                index={i}
                onClick={changeImage}
              />
            }
          })}
        </div>
      </div>

      <div className="hero__section__overlay__reverse" style={{paddingTop: 0}}>
        {similarProducts.map((similarProduct, i) => (
          <ProductCard product={similarProduct} key={i}/>
        ))}
      </div>
    </>
  );
}
