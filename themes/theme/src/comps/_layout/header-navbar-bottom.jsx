import React, { useState, useEffect, useRef, useContext } from 'react';
// import { gsap } from 'gsap';

// import Notifications from './notify/notify';
import HamburgerButton from './header-button-hamburger';
import CartButton from './header-button-cart';
import NavbarFlyoutDrawer, { 
  openDrawer as openFlyout,
  closeDrawer as closeFlyout,
} from './drawer-navbar-flyout';

// import AuthContext from '@/context/auth-ctx';
import CartContext from '@/context/cart-ctx';

import { openCart } from './drawer-cart';
import { openDrawer as openNavDrawer } from './drawer-nav';

import { transitionTextColor } from '@/util/transition';

import logo from './logo.svg';

// ==============================================

export default function NavbarBottom() {

  // --------------------------------------------

  // const { logged_in, user, logOut } = useContext(AuthContext);

  const [active_panel, setActivePanel] = useState(0);
  const [drawer_open, setDrawerOpen] = useState(false);

  // --------------------------------------------

  const {
    cart_btn_ref,
    cart_icon_target_ref,
    cart_count_ref,
  } = useContext(CartContext);

  // --------------------------------------------
  
  return (
    <>
      <NavbarFlyoutDrawer {...{active_panel, setActivePanel, drawer_open, setDrawerOpen}}/>

      <nav id="bottom">
        <div className="gutter">

          <a 
            href="/"
            >
            <img className="h-8 w-auto" src={logo} alt="Logo" />
          </a>


          <ul // navlinks
            className="hidden md:flex"
          >
            <li className={`pt-[2px] mr-8            ${transitionTextColor(active_panel === 0 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`} onClick={() => openFlyout(0)}>New & Featured</li>
            <li className={`pt-[2px] mr-8            ${transitionTextColor(active_panel === 1 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`} onClick={() => openFlyout(1)}>Men</li>
            <li className={`pt-[2px] lg:mr-8         ${transitionTextColor(active_panel === 2 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`} onClick={() => openFlyout(2)}>Women</li>
            <li className={`pt-[2px] hidden lg:block ${transitionTextColor(active_panel === 3 && drawer_open, 'border-b-2', 'border-b-2 border-transparent')}`} onClick={() => openFlyout(3)}>Sale</li>
          </ul>


          <div // buttons container
            className="flex  justify-between  w-[110px]  md:w-fit"
            >

            <CartButton onClick={() => openCart({})} {...{cart_btn_ref, cart_count_ref, cart_icon_target_ref}} />

            <HamburgerButton onClick={() => openNavDrawer()}/>

          </div>

        </div>
      </nav>
    </>
  );
}

// ==============================================