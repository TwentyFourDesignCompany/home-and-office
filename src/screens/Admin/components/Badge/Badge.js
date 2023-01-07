
import React, {useState} from "react";

export default function({color, values, setValues, index}){
  function deleteColor(e){
    e.preventDefault();

    let tempColors = [...values.colors];
    tempColors.splice(index, 1);
    setValues({...values, colors: tempColors});
  }

  return (
    <span 
      className={`badge-color`} 
      style={{backgroundColor: color, color: color === "black" ? "white" : "black"}}>
      {color}
      <button 
        className="color-close-btn" 
        style={{color: color === "black" ? "white" : "black"}}
        onClick={deleteColor}
      >
        X
      </button>
    </span>
  );
}
