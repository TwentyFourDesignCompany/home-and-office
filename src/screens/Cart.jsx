
import React, {useState, useEffect} from "react";
import LoggedInHeader from "../components/LoggedInHeader";
import CurrencyDisplay from "react-currency-format";

import {getItems, deleteFromCart, changeQuantity} from "../helper/cart-helper";
import {getUrl} from "../helper/url-helper";
import Payment from "../components/Payment";

function CartCard({product, setItems, index}){
  const [quantity, setQuantity] = useState(product.quantity);

  return (
    <div className="cart__container__left__card">
      <img
        src={product.item.images[0].url}
        alt="productPic"
        className="cart__container__left__card__img"
      />
      <div className="cart__container__left__card__content">
        <div className="cart__container__left__card__content__left">
          <div className="cart__container__left__card__content__left__headings">
            {product.item.productName}
            <span>Color: {product.item.colors.map((c, i) => {
              if (i === 0)
                return <span key={i}>{" "}{c}</span>
              else
                return <span key={i}>{" "}/{" "}{c}</span>
            })}</span>
          </div>
          <svg
            width="85"
            height="17"
            viewBox="0 0 85 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.54894 2.92705C7.8483 2.00574 9.1517 2.00574 9.45106 2.92705L10.1839 5.18237C10.3177 5.5944 10.7017 5.87336 11.1349 5.87336L13.5063 5.87336C14.475 5.87336 14.8778 7.11297 14.0941 7.68237L12.1756 9.07624C11.8251 9.33088 11.6784 9.78225 11.8123 10.1943L12.5451 12.4496C12.8445 13.3709 11.79 14.137 11.0063 13.5676L9.08778 12.1738C8.7373 11.9191 8.2627 11.9191 7.91221 12.1738L5.99372 13.5676C5.21001 14.137 4.15553 13.3709 4.45488 12.4496L5.18768 10.1943C5.32155 9.78225 5.1749 9.33088 4.82441 9.07624L2.90592 7.68237C2.1222 7.11297 2.52498 5.87336 3.4937 5.87336L5.86509 5.87336C6.29832 5.87336 6.68227 5.5944 6.81614 5.18237L7.54894 2.92705Z"
              fill="#F8DC4C"
            />
            <path
              d="M24.5489 2.92705C24.8483 2.00574 26.1517 2.00574 26.4511 2.92705L27.1839 5.18237C27.3177 5.5944 27.7017 5.87336 28.1349 5.87336L30.5063 5.87336C31.475 5.87336 31.8778 7.11297 31.0941 7.68237L29.1756 9.07624C28.8251 9.33088 28.6784 9.78225 28.8123 10.1943L29.5451 12.4496C29.8445 13.3709 28.79 14.137 28.0063 13.5676L26.0878 12.1738C25.7373 11.9191 25.2627 11.9191 24.9122 12.1738L22.9937 13.5676C22.21 14.137 21.1555 13.3709 21.4549 12.4496L22.1877 10.1943C22.3216 9.78225 22.1749 9.33088 21.8244 9.07624L19.9059 7.68237C19.1222 7.11297 19.525 5.87336 20.4937 5.87336L22.8651 5.87336C23.2983 5.87336 23.6823 5.5944 23.8161 5.18237L24.5489 2.92705Z"
              fill="#F8DC4C"
            />
            <path
              d="M41.5489 2.92705C41.8483 2.00574 43.1517 2.00574 43.4511 2.92705L44.1839 5.18237C44.3177 5.5944 44.7017 5.87336 45.1349 5.87336L47.5063 5.87336C48.475 5.87336 48.8778 7.11297 48.0941 7.68237L46.1756 9.07624C45.8251 9.33088 45.6784 9.78225 45.8123 10.1943L46.5451 12.4496C46.8445 13.3709 45.79 14.137 45.0063 13.5676L43.0878 12.1738C42.7373 11.9191 42.2627 11.9191 41.9122 12.1738L39.9937 13.5676C39.21 14.137 38.1555 13.3709 38.4549 12.4496L39.1877 10.1943C39.3216 9.78225 39.1749 9.33088 38.8244 9.07624L36.9059 7.68237C36.1222 7.11297 36.525 5.87336 37.4937 5.87336L39.8651 5.87336C40.2983 5.87336 40.6823 5.5944 40.8161 5.18237L41.5489 2.92705Z"
              fill="#F8DC4C"
            />
            <path
              d="M58.5489 2.92705C58.8483 2.00574 60.1517 2.00574 60.4511 2.92705L61.1839 5.18237C61.3177 5.5944 61.7017 5.87336 62.1349 5.87336L64.5063 5.87336C65.475 5.87336 65.8778 7.11297 65.0941 7.68237L63.1756 9.07624C62.8251 9.33088 62.6784 9.78225 62.8123 10.1943L63.5451 12.4496C63.8445 13.3709 62.79 14.137 62.0063 13.5676L60.0878 12.1738C59.7373 11.9191 59.2627 11.9191 58.9122 12.1738L56.9937 13.5676C56.21 14.137 55.1555 13.3709 55.4549 12.4496L56.1877 10.1943C56.3216 9.78225 56.1749 9.33088 55.8244 9.07624L53.9059 7.68237C53.1222 7.11297 53.525 5.87336 54.4937 5.87336L56.8651 5.87336C57.2983 5.87336 57.6823 5.5944 57.8161 5.18237L58.5489 2.92705Z"
              fill="#F8DC4C"
            />
            <path
              d="M75.5489 2.92705C75.8483 2.00574 77.1517 2.00574 77.4511 2.92705L78.1839 5.18237C78.3177 5.5944 78.7017 5.87336 79.1349 5.87336L81.5063 5.87336C82.475 5.87336 82.8778 7.11297 82.0941 7.68237L80.1756 9.07624C79.8251 9.33088 79.6784 9.78225 79.8123 10.1943L80.5451 12.4496C80.8445 13.3709 79.79 14.137 79.0063 13.5676L77.0878 12.1738C76.7373 11.9191 76.2627 11.9191 75.9122 12.1738L73.9937 13.5676C73.21 14.137 72.1555 13.3709 72.4549 12.4496L73.1877 10.1943C73.3216 9.78225 73.1749 9.33088 72.8244 9.07624L70.9059 7.68237C70.1222 7.11297 70.525 5.87336 71.4937 5.87336L73.8651 5.87336C74.2983 5.87336 74.6823 5.5944 74.8161 5.18237L75.5489 2.92705Z"
              fill="#F8DC4C"
            />
          </svg>
          <div className="cart__container__left__card__content__footer">
            <CurrencyDisplay 
              value={Number(product.item.price * quantity)} 
              displayType={'text'} 
              thousandSeparator={true} 
              prefix={'₦'} 
              renderText={value => <div>{value}</div>} />{" "}
            <div className="main__product__content__quantity">
              <button 
                className="main__product__content__quantity__min"
                onClick={() => {
                  if (quantity === 1){ 
                    const items = deleteFromCart(index);
                    setItems(items);
                  } else {
                    setQuantity(quantity - 1);
                    changeQuantity("subtract", product.item.id)
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.902"
                  height="2.731"
                  viewBox="0 0 13.902 1.731"
                  fill="currentColor"
                >
                  <path
                    id="Icon_ionic-ios-remove"
                    data-name="Icon ionic-ios-remove"
                    d="M22,16.875H9.83a.865.865,0,0,0,0,1.731H22a.865.865,0,1,0,0-1.731Z"
                    transform="translate(-8.965 -16.875)"
                  />
                </svg>
              </button>
              <div className="main__product__content__quantity__value">{quantity}</div>
              <button 
                className="main__product__content__quantity__max"
                onClick={() => {
                  setQuantity(quantity + 1);
                  changeQuantity("add", product.item.id)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17.31"
                  height="17.31"
                  viewBox="0 0 17.31 17.31"
                  fill="currentColor"
                >
                  <path
                    id="Icon_ionic-md-add"
                    data-name="Icon ionic-md-add"
                    d="M24.06,16.559h-7.5v7.5H14.251v-7.5H6.75V14.251h7.5V6.75h2.308v7.5h7.5Z"
                    transform="translate(-6.75 -6.75)"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{cursor: "pointer"}}
            onClick={() => {
              const items = deleteFromCart(index);
              setItems(items);
            }}
          >
            <line
              x1="8.37895"
              y1="23.4916"
              x2="23.9353"
              y2="7.93527"
              stroke="#474747"
              strokeWidth="2"
            />
            <line
              x1="8.06465"
              y1="7.93547"
              x2="23.621"
              y2="23.4918"
              stroke="#474747"
              strokeWidth="2"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function Cart(){
  const [items, setItems] = useState(getItems());

  function clearError(name){
    
  }

  /*function handleError(){
    let emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let val = emailReg.test(values.email);
  }*/

  return (
    <>
      <LoggedInHeader />
      <div className="cart__container">
        <div 
          className="cart__container__left" 
          style={{maxHeight: 600, overflow: "auto"}}
        >
          <div className="cart__container__left__header">
            Order <span>Total Items: {items.length}</span>
          </div>
          {items.map((item, i) => (
            <CartCard product={item} key={i} setItems={setItems} index={i}/>
          ))}
        </div>
        <Payment />
      </div>
    </>
  );
}
