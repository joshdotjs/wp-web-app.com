import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { AuthContextProvider } from "@/context/auth-ctx";
import { CartContextProvider } from "@/context/cart-ctx";

import Header from './header';

import './_layout.scss';

// ==============================================

export default function Layout({ children, name, restrict }) {

  // --------------------------------------------

  return (
    <AuthContextProvider { ...{ restrict } }>
      <CartContextProvider>

        <Header />

        <main id="page" className={`${name}`}>
          <div className="gutter">
            {children}
          </div>
        </main> 

        <footer>
          <p>footer</p>
        </footer>
      
      </CartContextProvider>
    </AuthContextProvider>
  );

  // --------------------------------------------

}

// ==============================================

const getElem   = (str) => document.querySelector(str)
const getHeight = (el)  => el.offsetHeight; 
const setStyle  = (el, {property, value }) => el.style[property] = value;

// ==========================================

const pageLoadAnim = () => {
  const body = getElem('body');
  gsap.to(body, { opacity: 1 });
};
pageLoadAnim();

// ==========================================