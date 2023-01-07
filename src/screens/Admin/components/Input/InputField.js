
import React from "react";
import {Form} from "react-bootstrap";
import CurrencyInput from 'react-currency-input-field';

export default function Input({
  name, 
  type,
  placeholder,
  label,
  onChange,
  error,
  errorMessage,
  children,
  value = "",
  multiple = false,
  defaultValue = ""
}){

  if (type === "textarea"){
    return (
      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Control
            as="textarea"
            placeholder={placeholder} 
            className={error ? "border-danger" : ""}
            defaultValue={defaultValue}
            style={{ height: '200px' }} onChange={onChange} name={name}/>
        {error && <Form.Label className="text-danger">{errorMessage}</Form.Label>}
      </Form.Group>
    )
  }

  if (type === "select"){
    return (
      <Form.Group className="mb-3">
        <Form.Select className={error ? "border-danger" : ""} type={type} placeholder={placeholder} onChange={onChange} name={name} defaultValue={defaultValue ? defaultValue : value}>
          {children}
        </Form.Select>
        {error && <Form.Label className="text-danger">{errorMessage}</Form.Label>}
      </Form.Group>
    )
  }

  if (name === "price"){
    return (
      <Form.Group className="mb-3">
        <CurrencyInput
          id="input-example"
          name={name}
          placeholder={placeholder}
          prefix="₦"
          defaultValue={defaultValue ? defaultValue : 1000}
          decimalsLimit={2}
          onValueChange={(value, name) => onChange({target: {
            value,
            name
          }})}
          className={error ? "price-input border-danger" : "price-input"}
        />
        {error && <Form.Label className="text-danger">{errorMessage}</Form.Label>}
      </Form.Group>
    )
  }

  return (
    <Form.Group className="mb-3">
      <Form.Control className={error ? "border-danger" : ""} name={name} type={type} placeholder={placeholder} onChange={onChange} defaultValue={defaultValue ? defaultValue : value} multiple={multiple}/>
        {error && <Form.Label className="text-danger">{errorMessage}</Form.Label>}
    </Form.Group>
  )
}
