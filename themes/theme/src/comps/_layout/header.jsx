import React, { useState, useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';

import Notifications from './notify/notify';
import HamburgerButton from './header-button-hamburger';
import CartButton from './header-button-cart';

import AuthContext from '@/context/auth-ctx';
import CartContext from '@/context/cart-ctx';


import NavbarBottom from './header-navbar-bottom';
import NavbarTop from './header-navbar-top'; 

import CartDrawer, { openCart } from './drawer-cart';
import NavDrawer, { openDrawer as openNavDrawer } from './drawer-nav';

import './header.scss';

// ==============================================

export default function Header() {

  // --------------------------------------------
  
  return (
    <>
      <CartDrawer />

      <NavDrawer title="" position="left" classes="w-[300px]">
      </NavDrawer>

      <header 
        id="navbar" 
        style={{ position: 'fixed' }}
      >

        <NavbarTop />

        <NavbarBottom />

      </header>
    </>
  );
}

// ==============================================