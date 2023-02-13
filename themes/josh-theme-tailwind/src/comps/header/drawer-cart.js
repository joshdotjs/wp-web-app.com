import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { lc, lg, lo, lp, lb, lr, ly } from '../../util/log';

// ==============================================

export default function DrawerCart({cart, cart_total, addToCart, removeFromCart, drawer_cart_open, closeCart, drawer_cart_overlay_ref }) {

  // --------------------------------------------
  
  const portal_root = document.querySelector('#react-portal-cart');
  
  // --------------------------------------------

  return createPortal( // portals preserve event delegation
    <div
      id="portal-cart-container"
      class="relative" 
      style={{
        zIndex: -1
      }} 
      aria-labelledby="slide-over-title" 
      role="dialog" 
      aria-modal="true"

      onClick={() => {
        lg('click outside cart drawer => close cart');
        closeCart();
      }} 
    >
          
      <div // overlay
        ref={drawer_cart_overlay_ref}
        class="pointer-events-auto fixed inset-0"
        style={{ 
          display: 'none', 
          opacity: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)', // Hey - I think this is not animating the blur!  I think a single blur is computed and then the opacity on it is animated - which is efficient.  I think animating a blur causes a diffrent blur to be computed for each frame of the animation with each one slightly more blurred than the previous.
        }}
      >  
      </div>

      <div // drawer 
        onClick={(e) => e.stopPropagation()} // close if click outside of drawer only.  Don't close if click inside of opened drawer.
        class="fixed overflow-hidden">
        <div 
          class={
            `
              fixed inset-y-0 right-0 flex max-w-full 
              ${!drawer_cart_open ? 'translate-x-full' : 'translate-x-0'} ease-in-out duration-300
            `
          }
        >

          <div class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">


                
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => closeCart()}>
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <ul role="list" class="-my-6 divide-y divide-gray-200">

                    {cart.map(({ID, qty, title, price}) => (
                        <li key={ID} class="flex py-6">
                          <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="h-full w-full object-cover object-center" />
                          </div>

                          <div class="ml-4 flex flex-1 flex-col">
                            <div>
                              <div class="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">{title}</a>
                                </h3>
                                <p class="ml-4">${price}</p>
                              </div>
                              <p class="mt-1 text-sm text-gray-500">Salmon</p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                              <p class="text-gray-500">Qty {qty}</p>

                              <div class="flex">
                                <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeFromCart(ID)}>Remove</button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}


                      
                    </ul>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cart_total}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  <a 
                    // href="/checkout" 
                    href={`${PHP.site_url}/checkout`}
                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                      Checkout
                  </a>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    <button onClick={closeCart} type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portal_root
  )
}
