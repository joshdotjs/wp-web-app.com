import { useState, useEffect, useRef } from "react";
import { ly, lc } from "../../util/log";

import NavbarTop from "./header-navbar-top";
import NavbarBottom from "./header-navbar-bottom";
import CartIcon from "./button-cart";

// ==============================================

// ==============================================

export default function Navbar({ site_urls, rest_urls, active_page, openDrawerCart, openDrawerNav, num_cart_items, logged_in, user }) {

  // --------------------------------------------

  const isActive = (page) => active_page == page ? 'bg-yellow-500' : '';

  // --------------------------------------------

  return (
    <header
      class="fixed top-0 w-full z-10"
    >

      <NavbarTop { ...{ site_urls, isActive, logged_in, user } } />

      <NavbarBottom { ...{ rest_urls, site_urls, openDrawerCart, openDrawerNav, num_cart_items, isActive } } />

    </header>
  );
}