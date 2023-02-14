import React, { useState, useEffect } from "react";

import './_.scss';

// ==============================================

export default function Checkbox({ id, type, option, applyFilter, onChange, checked }) {

  // --------------------------------------------

  // useEffect(() => {
  //   console.log('id: ', id, '\checked: ', checked);
  // }, [checked]);

  // --------------------------------------------
  

  return (
    <div className="checkbox-container">
      <input 
        type="checkbox" 
        id={id} 
        name={option} 
        checked={checked} // controlled-input
        // onChange={onChange(option)} 
        onChange={() => applyFilter({ type, option })} 
      />
      <label htmlFor={id}>{ option }</label>
    </div>
  );

  // --------------------------------------------
}