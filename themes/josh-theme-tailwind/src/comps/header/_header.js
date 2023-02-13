import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';

import DrawerNav from "./drawer-nav";
import DrawerCart from './drawer-cart';
import Navbar from "./header-navbar";

import { lc, lg, lo, lp, lb, lr, ly } from '../../util/log';
import { 
  getCartLS, setCartLS, 
  // setLoggedInLS, getLoggedInLS
 } from '../../util/local-storage';
import { fireEvent } from '../../util/custom-event';
import { fetchGET } from '../../util/fetch';

// ==============================================

export default function Header({ site_urls, rest_urls, active_page, is_logged_in, user }) {

  // console.log('active_page: ', active_page);
  // console.log('is_logged_in: ', is_logged_in);

  // --------------------------------------------

  // state for logged_in to allow them to log out and update the navbar
  const [logged_in, setLoggedIn] = useState(!!is_logged_in);

  const drawer_cart_overlay_ref = useRef(null);
  const drawer_nav_overlay_ref = useRef(null);
  const [drawer_cart_open, setDrawerCartOpen] = useState(false);
  const [drawer_nav_open, setDrawerNavOpen] = useState(false);

  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(true);


  // --------------------------------------------

  // Page load:
  //  -Initial load of cart from LS to set local 'cart' state in this component.
  //  -Set event listeners for cart events (fired from anywhere) to update 'cart' state in this component.
  useEffect(() => {

    // console.log('loading cart');

    // Check local storage for cart:
    const updateLocalCartState = () => {

      const ls_cart = getCartLS(); // returns null if the key in local-storage does not exist
      if (ls_cart === null) {
        // console.log('cart does not exist in local storage');
        
        // -Create local storage key 'cart' with empty (stringified) array
        setCartLS([]);

      } else {
        // console.log('grabbing cart from local storage...');
        setCart(ls_cart);
      }
    };
    updateLocalCartState();

    const handleEventCartAdd = () => {
      lp("item added to cart (event listening in Header component in /src/comps/header/header.js [rendered in theme's header.php file])");
      updateLocalCartState();
      openDrawerCart();
    };

    const handleEventCartRemove = () => {
      lc("item removed to cart (event listening in Header component in /src/comps/header/header.js [rendered in theme's header.php file])");
      updateLocalCartState();
    };

    // Logging in and out id done in-place in the auth page

    // const handleLogin = () => {
    //   lc('login handler in header listening to the log-in event');
    //   // setLoggedInLS(1);
    //   // setLoggedIn(1);
    // };

    // const handleLogout = () => {
    //   lp('logout handler in header listening to the log-out event');
    //   // setLoggedInLS("");
    //   setLoggedIn("");
    //   window.location.pathname = '/';
    // };
    
    window.addEventListener('cart-add', handleEventCartAdd);
    window.addEventListener('cart-remove', handleEventCartRemove);
    // window.addEventListener('log-in', handleLogin);
    // window.addEventListener('log-out', handleLogout);

    return () => {
      window.removeEventListener('cart-add', handleEventCartAdd);
      window.removeEventListener('cart-remove', handleEventCartRemove);
      // window.removeEventListener('log-in', handleLogin);
      // window.removeEventListener('log-out', handleLogout);
    };
  }, []);

  // --------------------------------------------

  // Page Load (hanlde other cases in the event listeners above):
  // -Currently using the logged in state from local storage set in the handler for the 'login' event above (triggered from the login page) - not the one comming from PHP
  // useEffect(() => {
  //   // setLoggedInLS(logged_in);
  //   const is_logged_in = getLoggedInLS(); // 1 or ""
  //   setLoggedIn(is_logged_in);
  // }, []);

  // --------------------------------------------

  const [cart_total, setCartTotal] = useState(0);
  const [num_cart_items, setNumCartItems] = useState(0);
  useEffect(() => { // update cart total
    let total = 0;
    cart.forEach(item => total += item.price * item.qty);
    setCartTotal(total);
    setNumCartItems(cart.length);
  }, [cart]);

  // --------------------------------------------

  // useEffect(() => {
  //   console.log('products: ', products);
  // }, [products])

  // --------------------------------------------
  
  const openDrawerCart = () => {
    setDrawerCartOpen(true);

    console.log('openDrawerCart()');

    const container = document.querySelector('#portal-cart-container');
    container.style.zIndex = 100;
    // console.log('container: ',  container);

    lr('opening cart drawer');
    const ref = drawer_cart_overlay_ref.current;
    ref.style.display = 'block';
    gsap.to(ref, { 
      opacity: 1, 
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      },
    });
  };

  const openDrawerNav = () => {
    setDrawerNavOpen(true);

    console.log('openDrawerNav()');

    const container = document.querySelector('#portal-navdrawer-container');
    container.style.zIndex = 100;
    // console.log('container: ',  container);

    lr('opening nav drawer');
    const ref = drawer_nav_overlay_ref.current;
    ref.style.display = 'block';
    gsap.to(ref, { 
      opacity: 1, 
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      },
    });
  };

  // --------------------------------------------
  
  const closeCart = () => {
    fireEvent('cart-close');
    setDrawerCartOpen(false);
    const ref = drawer_cart_overlay_ref.current;
    gsap.to(ref, { 
      opacity: 0,
       duration: 0.3, 
       onComplete: () => {
        ref.style.display = 'none';
        document.body.style.overflow = "overlay"; // custom scrollbar overlay

        const container = document.querySelector('#portal-cart-container');
        container.style.zIndex = -1;

      }});
  };

  const closeDrawerNav = () => {
    fireEvent('cart-close');
    setDrawerNavOpen(false);
    const ref = drawer_nav_overlay_ref.current;
    gsap.to(ref, { 
      opacity: 0,
       duration: 0.3, 
       onComplete: () => {
        ref.style.display = 'none';
        document.body.style.overflow = "overlay";  // custom scrollbar overlay

        const container = document.querySelector('#portal-navdrawer-container');
        container.style.zIndex = -1;
    }});
  };
  
  // --------------------------------------------

  const addToCart = (product) => {

    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???
    // NOTE: Why is this ID lowercase and below (removeFromCart) uppercase???

    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps
    // TODO: Make all the fields the same across the three apps

    const { id } = product;

    const idx = cart.findIndex(x => id === x.id);

    if (idx < 0) {
      lo('addToCart() - new line item');
      const new_cart = [...cart, { ...product, qty: 1 }]; // clone local cart state and add a new product item to the array with the cloned cart.
      setCartLS(new_cart);
    } else {
      ly('addToCart() - updating quantity');
      const new_cart = [...cart]; // clone local cart state via deep copy.
      new_cart[idx] = {...cart[idx], qty: cart[idx].qty + 1}; // update specific item's quantity in the cloned cart array.
      setCartLS(new_cart);
    }

    // - - - - - - - - - - - - - - - - - - - - - 


    // TODO: FLIP anim...

    // - - - - - - - - - - - - - - - - - - - - - 

    fireEvent('cart-add');
  };
  
  // --------------------------------------------

  const removeFromCart = (id) => {
    lg('removeFromCart()');
    const new_cart = cart.filter(item => item.ID !== id);
    setCartLS(new_cart);
    setCart(new_cart);
    fireEvent('cart-remove');

    if (new_cart.length < 1) {
      closeCart();
    }
  }

  // --------------------------------------------

  return (
    <>

      <DrawerNav { ...{ site_urls, drawer_nav_open, closeDrawerNav, drawer_nav_overlay_ref, logged_in, user } } />

      <DrawerCart { ...{ cart, cart_total, addToCart, removeFromCart, drawer_cart_open, closeCart, drawer_cart_overlay_ref } } />
      
      <Navbar { ...{ site_urls, rest_urls, active_page, openDrawerCart, openDrawerNav, num_cart_items, logged_in, user } }/>
    
    </>
  );
};