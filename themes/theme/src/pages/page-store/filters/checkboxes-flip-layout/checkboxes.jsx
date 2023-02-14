import React, { useState, useEffect, Fragment } from "react";

import './_.scss';
import Checkbox from "./checkbox/checkbox";

// ==============================================

export default function Checkboxes({ type, options, set, applyFilter, in_init_state }) {
  
  // --------------------------------------------

  // -options:    array of options to choose from.
  // -set:        set of chosen options.
  // -setSet:     function setting the external chosen set.

  // --------------------------------------------

  // useEffect(() => {
  //   console.log('set: ', set, '\toptions: ', options);
  // }, [set]);

  // --------------------------------------------
  
  return (
    <div className="checkboxes-container">
      { options.map((option) => {

        const key = `check-${option}`;

        return (
          <Fragment key={key}>
            {/* <Checkbox id={key} checked={state[idx]} { ...{ type, option, onChange } } /> */}
            <Checkbox id={key} checked={!in_init_state && set?.has(option)} { ...{ type, option, applyFilter } } />
          </Fragment>
        );
      }) }
    
    </div>
  );
}