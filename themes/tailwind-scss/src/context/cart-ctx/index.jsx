import React, { useState, useEffect, useRef, createContext, } from 'react';
import uuid from 'react-uuid';

import { lo, lg, lr, lb, ly } from '@/util/log';

// import { 
//   getCartLS,
//   addToCartLS, removeFromCartLS
//  } from './cart-fn';

// ==============================================

const CartContext = createContext({
  cart: [],
  setCart: function() {},
});

// ==============================================

const CartContextProvider = ({ children }) => {

  // --------------------------------------------

  // const [num_cart_items, setNumCartItems] = useState(0);
  const cart_btn_ref = useRef(null); // cartBtn = cart.querySelector(".btn-cart");
  const cart_icon_target_ref = useRef(null); // cartItems = cart.querySelector(".items");
  const cart_count_ref = useRef(null); // cartCount = cart.querySelector(".count");
  
  const overlay_ref = useRef(null);

  // --------------------------------------------

  const context = {
    // num_cart_items,
    // setNumCartItems,
    cart_btn_ref,
    cart_icon_target_ref,
    cart_count_ref,
    // cart_open,
    overlay_ref,
  };


  // --------------------------------------------

  return (
    <CartContext.Provider value={context}>{ children }</CartContext.Provider>
  );

};

// ==============================================

export default CartContext;
export { CartContextProvider };