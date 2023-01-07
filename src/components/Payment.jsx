
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {usePaystackPayment} from 'react-paystack';
import CurrencyDisplay from "react-currency-format";

import {getUrl} from '../helper/url-helper';
import {getItems} from "../helper/cart-helper";

function Payment(){
  const [items, setItems] = useState(getItems());
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    amount: getItems().reduce((total, val) => {
      return total + (Number(val.item.price) * Number(val.quantity));
    }, 0),
    items: getItems()
  });

  const navigate = useNavigate();

  const [firstNameError, setFirstNameError] = useState({
    error: false,
    errorMessage: ""
  });
  const [lastNameError, setLastNameError] = useState({
    error: false,
    errorMessage: ""
  });
  const [emailError, setEmailError] = useState({
    error: false,
    errorMessage: ""
  });
  const [addressError, setAddressError] = useState({
    error: false,
    errorMessage: ""
  });

  const config = {
    reference: (new Date()).getTime().toString(),
    email: values.email,
    amount: values.amount * 100,
    publicKey: 'pk_test_1f0607782b100bdb7bbc7ea9c988d8e9c979c6f3',
  };

  const onSuccess = (reference) => {
    async function purchase(){
      let response = await fetch(`${getUrl()}/items/orders/purchase`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
       },
        body: JSON.stringify(values)
     })
  
      let rs = await response.json()
  
      if (rs.success){
        navigate("/");
      } else {
        console.log(rs)
      }
    }

    purchase();
  };

  const onClose = () => {
    console.log('closed')
  };

  function handleChange(e){
    let name = e.target.name;

    clearError(name);

    setValues({...values, [name]: e.target.value});
  };

  function clearError(name){
    if (name === "firstName"){
      setFirstNameError({
        error: false,
        errorMessage: ""
      })
    }

    if (name === "lastName"){
      setLastNameError({
        error: false,
        errorMessage: ""
      })
    }

    if (name === "email"){
      setEmailError({
        error: false,
        errorMessage: ""
      })
    }

    if (name === "address"){
      setAddressError({
        error: false,
        errorMessage: ""
      })
    }
  };

  const initializePayment = usePaystackPayment(config);

  function validate(){
    let valid = true;

    if (values.firstName.length < 3){
      valid = false;
      setFirstNameError({
        error: true,
        errorMessage: "First Name must be atleast 3 characters"
      });
    }

    if (values.lastName.length < 3){
      valid = false;
      setLastNameError({
        error: true,
        errorMessage: "Last Name must be atleast 3 characters"
      });
    }

    let emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let val = emailReg.test(values.email);

    if (!val){
      valid = false;
      setEmailError({
        error: true,
        errorMessage: "Enter a valid email address"
      })
    }

    if (values.address.length < 10){
      valid = false;
      setAddressError({
        error: true,
        errorMessage: "Address must be atleast 10 characters"
      })
    }

    return valid;
  }

  function handleSubmit(){
    let valid = validate();
    
    if (valid){
      initializePayment(onSuccess, onClose);
    } else {
      let elem = document.getElementById("payment-top");
      window.scrollTo({
        top: elem.offsetTop - 20,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="cart__container__right">
      <div className="cart__container__right__header">
        <div className="cart__container__right__header__heading" id='payment-top'>
          Payment Methods
        </div>
        <div 
          className="cart__container__right__header__input__double"
        >
          <span style={{position: "relative"}}>
            <input
              type="text"
              name='firstName'
              placeholder="First Name"
              className="cart__container__right__header__input"
              onChange={handleChange}  
              style={{borderColor: firstNameError.error ? "red" : "", width: "45%"}}
            />
            <p className='error-message'>{firstNameError.errorMessage}</p>
          </span>
          <span style={{position: "relative"}}>
            <input
              type="text"
              name='lastName'
              placeholder="Last Name"
              className="cart__container__right__header__input"
              onChange={handleChange}
              style={{borderColor: lastNameError.error ? "red" : "", width: "50%"}}
            />
            <p className='error-message'>{lastNameError.errorMessage}</p>
          </span>
        </div>
        <div style={{position: "relative"}}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="cart__container__right__header__input"
            onChange={handleChange}
            style={{borderColor: emailError.error ? "red" : "", width: "100%"}}
          />
          <p className='error-message'>{emailError.errorMessage}</p>
        </div>
        <div style={{position: "relative"}}>
          <input
            type="text"
            placeholder="Home Address"
            name="address"
            className="cart__container__right__header__input"
            onChange={handleChange}
            style={{borderColor: addressError.error ? "red" : "", width: "100%"}}
          />
          <p className='error-message'>{addressError.errorMessage}</p>
        </div>
      </div>
      <div className="cart__container__right__bottom">
        <div className="cart__container__right__bottom__heading">
          Order Summary
        </div>
        <div className="cart__container__right__bottom__row">
          Balance amount <span> ₦ 68</span>
        </div>
        <div className="cart__container__right__bottom__row">
          VAT (21%) <span>₦ 13</span>
        </div>
        <div className="cart__container__right__bottom__row">
          Shipping Fee <span>₦ 10</span>
        </div>
        <div className="cart__container__right__bottom__row">
          Order Total: <span> <CurrencyDisplay 
          value={Number(values.amount)} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'₦'} 
          renderText={value => <span>{value}</span>} /></span>
        </div>
      </div>
      <button 
        onClick={handleSubmit}
        className="flexibility__section__btn"
      >
        Purchase
      </button>
    </div>
  );
}

export default Payment;

