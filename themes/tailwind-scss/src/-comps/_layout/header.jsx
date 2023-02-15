import React from 'react';

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