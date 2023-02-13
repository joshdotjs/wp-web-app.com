import React, { useState, useEffect, useRef } from "react";

import Debug from "../../comps/debug/debug";

import { lc, lg, lo, lp, lb, lr, ly } from '../../util/log';
import { getLS, setLS } from '../../util/local-storage';
import { fireEvent } from '../../util/custom-event';
import { fetchGET } from '../../util/fetch';

// ==============================================

export default function Single({ id }) {

  // --------------------------------------------
  
  const [product, setProduct] = useState([]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [Custom Endpoint] Get product by ID:
  const getProductByID = async (id) => {
    // lo('getProductByID() - sending request...');
    // const data = await fetchGET(`/wp-json/josh/v1/product/${id}`);
    const data = await fetchGET(`${PHP.rest_url}/product/${id}`);
    // console.log('response: ', data);
    // lg('^^^^^^ response ^^^^^^');
    
    setProduct(data[0]);
  };
  
  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // page load:
  useEffect(async () => {
    await getProductByID(id);
  }, []);

  // - - - - - - - - - - - - - - - - - - - - - - 

  useEffect(() => {
    console.log('product: ', product);
  }, [product]);

  // -----------------------------------------------

  const [ show_menu, setShowMenu ] = useState({ show: false, idx: null });
  const openMenu   = (idx) => { setShowMenu({ show: true,    idx }); }
  const closeMenu  = ()    => { setShowMenu({ show: false,   idx: null }); }
  // const toggleMenu = (idx) => { setShowMenu(({ show }) => ({ show: !show, idx }))}
  const toggleMenu = (idx) => { 
    setShowMenu((prev) => {
      const { show } = prev;
      if (show) {

        // -if one flyover menu is open (e.g. women)
        //  and user clicks another button (e.g. men)
        //  then don't actually toggle the flyover menu,
        //  just leave it open but change the index
        //  corresponding to the newly clicked button.
        if (idx === prev.idx) // user clicked same one twice => toggle
          return { show: false, idx: null};
        else // user clicked new idx => leave open, but change flyover menu idx
          return { show: true, idx };
      } else {
        return { show: true, idx };
      }
    }); // showMenu() invocation
  }; // toggleMenu() function expression defintiion
  

  // -----------------------------------------------
  
  return (
    <>
      <div 
        class="bg-white"
        onClick={(e) => {
          ly('clicked top level element');
          closeMenu();
      }}>
        {/* <!--
          Mobile menu

          Off-canvas menu for mobile, show/hide based on off-canvas menu state.
        --> */}
        <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
          {/* <!--
            Off-canvas menu backdrop, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
              From: "opacity-0"
              To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
              From: "opacity-100"
              To: "opacity-0"
          --> */}
          <div class="fixed inset-0 bg-black bg-opacity-25"></div>

          <div class="fixed inset-0 z-40 flex">
            {/* <!--
              Off-canvas menu, show/hide based on off-canvas menu state.

              Entering: "transition ease-in-out duration-300 transform"
                From: "-translate-x-full"
                To: "translate-x-0"
              Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "-translate-x-full"
            --> */}
            <div class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pt-5 pb-2">
                <button type="button" class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                  <span class="sr-only">Close menu</span>
                  {/* <!-- Heroicon name: outline/x-mark --> */}
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* <!-- Links --> */}
              <div class="mt-2">
                <div class="border-b border-gray-200">
                  <div class="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
                    {/* <!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" --> */}
                    <button id="tabs-1-tab-1" class="text-gray-900 border-transparent flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium" aria-controls="tabs-1-panel-1" role="tab" type="button">Women</button>

                    {/* <!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" --> */}
                    <button id="tabs-1-tab-2" class="text-gray-900 border-transparent flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium" aria-controls="tabs-1-panel-2" role="tab" type="button">Men</button>
                  </div>
                </div>

                {/* <!-- 'Women' tab panel, show/hide based on tab state. --> */}
                <div id="tabs-1-panel-1" class="space-y-10 px-4 pt-10 pb-8" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
                  <div class="space-y-4">
                    <div class="group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100">
                      <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." class="object-cover object-center group-hover:opacity-75" />
                      <div class="flex flex-col justify-end">
                        <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                          <a href="#" class="font-medium text-gray-900">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            New Arrivals
                          </a>
                          <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                        </div>
                      </div>
                    </div>

                    <div class="group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100">
                      <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg" alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees." class="object-cover object-center group-hover:opacity-75" />
                      <div class="flex flex-col justify-end">
                        <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                          <a href="#" class="font-medium text-gray-900">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Basic Tees
                          </a>
                          <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                        </div>
                      </div>
                    </div>

                    <div class="group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100">
                      <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg" alt="Model wearing minimalist watch with black wristband and white watch face." class="object-cover object-center group-hover:opacity-75" />
                      <div class="flex flex-col justify-end">
                        <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                          <a href="#" class="font-medium text-gray-900">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Accessories
                          </a>
                          <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-10">
                    <div>
                      <p id="women-shoes-heading-mobile" class="font-medium text-gray-900">Shoes &amp; Accessories</p>
                      <ul role="list" aria-labelledby="women-shoes-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sneakers</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Boots</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Flats</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sandals</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Heels</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Socks</a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p id="women-collection-heading-mobile" class="font-medium text-gray-900">Shop Collection</p>
                      <ul role="list" aria-labelledby="women-collection-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Everything</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Core</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">New Arrivals</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sale</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Accessories</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="space-y-10">
                    <div>
                      <p id="women-clothing-heading-mobile" class="font-medium text-gray-900">All Clothing</p>
                      <ul role="list" aria-labelledby="women-clothing-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Basic Tees</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Artwork Tees</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Tops</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Bottoms</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Swimwear</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Underwear</a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p id="women-accessories-heading-mobile" class="font-medium text-gray-900">All Accessories</p>
                      <ul role="list" aria-labelledby="women-accessories-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Watches</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Wallets</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Bags</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sunglasses</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Hats</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Belts</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="space-y-10">
                    <div>
                      <p id="women-brands-heading-mobile" class="font-medium text-gray-900">Brands</p>
                      <ul role="list" aria-labelledby="women-brands-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Full Nelson</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">My Way</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Re-Arranged</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Counterfeit</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Significant Other</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* <!-- 'Men' tab panel, show/hide based on tab state. --> */}
                <div id="tabs-1-panel-2" class="space-y-10 px-4 pt-10 pb-8" aria-labelledby="tabs-1-tab-2" role="tabpanel" tabindex="0">
                  <div class="space-y-4">
                    <div class="group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100">
                      <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg" alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters." class="object-cover object-center group-hover:opacity-75" />
                      <div class="flex flex-col justify-end">
                        <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                          <a href="#" class="font-medium text-gray-900">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Accessories
                          </a>
                          <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                        </div>
                      </div>
                    </div>

                    <div class="group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100">
                      <img src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg" alt="Drawstring top with elastic loop closure and textured interior padding." class="object-cover object-center group-hover:opacity-75" />
                      <div class="flex flex-col justify-end">
                        <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                          <a href="#" class="font-medium text-gray-900">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            New Arrivals
                          </a>
                          <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                        </div>
                      </div>
                    </div>

                    <div class="group aspect-w-1 aspect-h-1 relative overflow-hidden rounded-md bg-gray-100">
                      <img src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg" alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt." class="object-cover object-center group-hover:opacity-75" />
                      <div class="flex flex-col justify-end">
                        <div class="bg-white bg-opacity-60 p-4 text-base sm:text-sm">
                          <a href="#" class="font-medium text-gray-900">
                            <span class="absolute inset-0" aria-hidden="true"></span>
                            Artwork Tees
                          </a>
                          <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-10">
                    <div>
                      <p id="men-shoes-heading-mobile" class="font-medium text-gray-900">Shoes &amp; Accessories</p>
                      <ul role="list" aria-labelledby="men-shoes-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sneakers</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Boots</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sandals</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Socks</a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p id="men-collection-heading-mobile" class="font-medium text-gray-900">Shop Collection</p>
                      <ul role="list" aria-labelledby="men-collection-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Everything</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Core</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">New Arrivals</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sale</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="space-y-10">
                    <div>
                      <p id="men-clothing-heading-mobile" class="font-medium text-gray-900">All Clothing</p>
                      <ul role="list" aria-labelledby="men-clothing-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Basic Tees</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Artwork Tees</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Pants</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Hoodies</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Swimsuits</a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p id="men-accessories-heading-mobile" class="font-medium text-gray-900">All Accessories</p>
                      <ul role="list" aria-labelledby="men-accessories-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Watches</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Wallets</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Bags</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Sunglasses</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Hats</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Belts</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="space-y-10">
                    <div>
                      <p id="men-brands-heading-mobile" class="font-medium text-gray-900">Brands</p>
                      <ul role="list" aria-labelledby="men-brands-heading-mobile" class="mt-6 flex flex-col space-y-6">
                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Re-Arranged</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Counterfeit</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">Full Nelson</a>
                        </li>

                        <li class="flow-root">
                          <a href="#" class="-m-2 block p-2 text-gray-500">My Way</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Company</a>
                </div>

                <div class="flow-root">
                  <a href="#" class="-m-2 block p-2 font-medium text-gray-900">Stores</a>
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4">
                <a href="#" class="-m-2 flex items-center p-2">
                  <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 flex-shrink-0" />
                  <span class="ml-3 block text-base font-medium text-gray-900">CAD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <header class="relative bg-white">
          <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="border-b border-gray-200">
              <div class="flex h-16 items-center justify-between">
                <div class="flex flex-1 items-center lg:hidden">
                  {/* <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. --> */}
                  <button type="button" class="-ml-2 rounded-md bg-white p-2 text-gray-400">
                    <span class="sr-only">Open menu</span>
                    {/* <!-- Heroicon name: outline/bars-3 --> */}
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </button>

                  <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Search</span>
                    {/* <!-- Heroicon name: outline/magnifying-glass --> */}
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </a>
                </div>




















                {/* <!-- Flyout menus --> */}
                <div // flyout menus
                  onClick={(e) => {
                    e.stopPropagation(); // clicking anywhere besides the menu will close the opened menu
                  }}
                  class="hidden lg:block lg:flex-1 lg:self-stretch"
                >
                  <div class="flex h-full space-x-8">


                    {/* - - - - - - - - - - - - - - */}

                    <div // button for flyout menu (1: women) 
                      class="flex">
                      <div class="relative flex">
                        {/* <!-- Item active: "text-indigo-600", Item inactive: "text-gray-700 hover:text-gray-800" --> */}
                        <button
                          onClick={(e) => {
                            lc('clicked');
                            toggleMenu(0);
                            e.stopPropagation(); // don't bubble event up in order to not click the top-level element in this element that closes the menu.
                          }} 
                          type="button" class="text-gray-700 hover:text-gray-800 relative z-10 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out" aria-expanded="false">
                          Women
                          {/* <!-- Open: "bg-indigo-600", Closed: "" --> */}
                          <span class="absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-200 ease-out sm:mt-5 sm:translate-y-px sm:transform" aria-hidden="true"></span>
                        </button>
                      </div>

                      {/* <!--
                        'Women' flyout menu, show/hide based on flyout menu state.

                        Entering: "transition ease-out duration-200"
                          From: "opacity-0"
                          To: "opacity-100"
                        Leaving: "transition ease-in duration-150"
                          From: "opacity-100"
                          To: "opacity-0"
                      --> */}

                      { show_menu.show && show_menu.idx === 0 &&
                        <div class="absolute inset-x-0 top-full z-10">
                          {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
                          <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

                          <div class="relative bg-white">
                            <div class="mx-auto max-w-7xl px-8">
                              <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                <div class="grid grid-cols-2 grid-rows-1 gap-8 text-sm">
                                  <div class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden col-span-2 aspect-w-2">
                                    <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." class="object-cover object-center group-hover:opacity-75" />
                                    <div class="flex flex-col justify-end">
                                      <div class="bg-white bg-opacity-60 p-4 text-sm">
                                        <a href="#" class="font-medium text-gray-900">
                                          <span class="absolute inset-0" aria-hidden="true"></span>
                                          New Arrivals
                                        </a>
                                        <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden">
                                    <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg" alt="Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees." class="object-cover object-center group-hover:opacity-75" />
                                    <div class="flex flex-col justify-end">
                                      <div class="bg-white bg-opacity-60 p-4 text-sm">
                                        <a href="#" class="font-medium text-gray-900">
                                          <span class="absolute inset-0" aria-hidden="true"></span>
                                          Basic Tees
                                        </a>
                                        <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden">
                                    <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-03.jpg" alt="Model wearing minimalist watch with black wristband and white watch face." class="object-cover object-center group-hover:opacity-75" />
                                    <div class="flex flex-col justify-end">
                                      <div class="bg-white bg-opacity-60 p-4 text-sm">
                                        <a href="#" class="font-medium text-gray-900">
                                          <span class="absolute inset-0" aria-hidden="true"></span>
                                          Accessories
                                        </a>
                                        <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="grid grid-cols-3 gap-y-10 gap-x-8 text-sm text-gray-500">
                                  <div class="space-y-10">
                                    <div>
                                      <p id="women-shoes-heading" class="font-medium text-gray-900">Shoes &amp; Accessories</p>
                                      <ul role="list" aria-labelledby="women-shoes-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sneakers</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Boots</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Flats</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sandals</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Heels</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Socks</a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p id="women-collection-heading" class="font-medium text-gray-900">Shop Collection</p>
                                      <ul role="list" aria-labelledby="women-collection-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Everything</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Core</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">New Arrivals</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sale</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Accessories</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div class="space-y-10">
                                    <div>
                                      <p id="women-clothing-heading" class="font-medium text-gray-900">All Clothing</p>
                                      <ul role="list" aria-labelledby="women-clothing-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Basic Tees</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Artwork Tees</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Tops</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Bottoms</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Swimwear</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Underwear</a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p id="women-accessories-heading" class="font-medium text-gray-900">All Accessories</p>
                                      <ul role="list" aria-labelledby="women-accessories-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Watches</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Wallets</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Bags</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sunglasses</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Hats</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Belts</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div class="space-y-10">
                                    <div>
                                      <p id="women-brands-heading" class="font-medium text-gray-900">Brands</p>
                                      <ul role="list" aria-labelledby="women-brands-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Full Nelson</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">My Way</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Re-Arranged</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Counterfeit</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Significant Other</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      } {/* Flyout Menu (1 - Women) */}
                    </div>


                    {/* - - - - - - - - - - - - - - */}
                    


                    <div // button for flyout menu (2: men) 
                      class="flex">
                      <div class="relative flex">
                        {/* <!-- Item active: "text-indigo-600", Item inactive: "text-gray-700 hover:text-gray-800" --> */}
                        <button 
                          onClick={(e) => {
                            lc('clicked');
                            toggleMenu(1);
                            e.stopPropagation(); // don't bubble event up in order to not click the top-level element in this element that closes the menu.
                          }}
                          type="button" class="text-gray-700 hover:text-gray-800 relative z-10 flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out" aria-expanded="false">
                          Men
                          {/* <!-- Open: "bg-indigo-600", Closed: "" --> */}
                          <span class="absolute inset-x-0 bottom-0 h-0.5 transition-colors duration-200 ease-out sm:mt-5 sm:translate-y-px sm:transform" aria-hidden="true"></span>
                        </button>
                      </div>

                      {/* <!--
                        'Men' flyout menu, show/hide based on flyout menu state.

                        Entering: "transition ease-out duration-200"
                          From: "opacity-0"
                          To: "opacity-100"
                        Leaving: "transition ease-in duration-150"
                          From: "opacity-100"
                          To: "opacity-0"
                      --> */}
                      { show_menu.show && show_menu.idx === 1 &&
                        <div class="absolute inset-x-0 top-full z-10">
                          {/* <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow --> */}
                          <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"></div>

                          <div class="relative bg-white">
                            <div class="mx-auto max-w-7xl px-8">
                              <div class="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                <div class="grid grid-cols-2 grid-rows-1 gap-8 text-sm">
                                  <div class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden col-span-2 aspect-w-2">
                                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg" alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters." class="object-cover object-center group-hover:opacity-75" />
                                    <div class="flex flex-col justify-end">
                                      <div class="bg-white bg-opacity-60 p-4 text-sm">
                                        <a href="#" class="font-medium text-gray-900">
                                          <span class="absolute inset-0" aria-hidden="true"></span>
                                          Accessories
                                        </a>
                                        <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden">
                                    <img src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg" alt="Drawstring top with elastic loop closure and textured interior padding." class="object-cover object-center group-hover:opacity-75" />
                                    <div class="flex flex-col justify-end">
                                      <div class="bg-white bg-opacity-60 p-4 text-sm">
                                        <a href="#" class="font-medium text-gray-900">
                                          <span class="absolute inset-0" aria-hidden="true"></span>
                                          New Arrivals
                                        </a>
                                        <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="group relative aspect-w-1 aspect-h-1 rounded-md bg-gray-100 overflow-hidden">
                                    <img src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg" alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt." class="object-cover object-center group-hover:opacity-75" />
                                    <div class="flex flex-col justify-end">
                                      <div class="bg-white bg-opacity-60 p-4 text-sm">
                                        <a href="#" class="font-medium text-gray-900">
                                          <span class="absolute inset-0" aria-hidden="true"></span>
                                          Artwork Tees
                                        </a>
                                        <p aria-hidden="true" class="mt-0.5 text-gray-700 sm:mt-1">Shop now</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="grid grid-cols-3 gap-y-10 gap-x-8 text-sm text-gray-500">
                                  <div class="space-y-10">
                                    <div>
                                      <p id="men-shoes-heading" class="font-medium text-gray-900">Shoes &amp; Accessories</p>
                                      <ul role="list" aria-labelledby="men-shoes-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sneakers</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Boots</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sandals</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Socks</a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p id="men-collection-heading" class="font-medium text-gray-900">Shop Collection</p>
                                      <ul role="list" aria-labelledby="men-collection-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Everything</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Core</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">New Arrivals</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sale</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div class="space-y-10">
                                    <div>
                                      <p id="men-clothing-heading" class="font-medium text-gray-900">All Clothing</p>
                                      <ul role="list" aria-labelledby="men-clothing-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Basic Tees</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Artwork Tees</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Pants</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Hoodies</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Swimsuits</a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p id="men-accessories-heading" class="font-medium text-gray-900">All Accessories</p>
                                      <ul role="list" aria-labelledby="men-accessories-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Watches</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Wallets</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Bags</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Sunglasses</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Hats</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Belts</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>

                                  <div class="space-y-10">
                                    <div>
                                      <p id="men-brands-heading" class="font-medium text-gray-900">Brands</p>
                                      <ul role="list" aria-labelledby="men-brands-heading" class="mt-4 space-y-4">
                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Re-Arranged</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Counterfeit</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">Full Nelson</a>
                                        </li>

                                        <li class="flex">
                                          <a href="#" class="hover:text-gray-800">My Way</a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      } {/* Flyout Menu (2 - Men) */}
                    </div>


                    {/* - - - - - - - - - - - - - - */}


                    {/* button for flyout menu (3: company)  */}
                    <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Company</a>

                    {/* - - - - - - - - - - - - - - */}

                    {/* button for flyout menu (4: stores)  */}
                    <a href="#" class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Stores</a>

                    {/* - - - - - - - - - - - - - - */}
                  </div>
                </div>





























                {/* <!-- Logo --> */}
                <a href="#" class="flex">
                  <span class="sr-only">Your Company</span>
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>

                <div class="flex flex-1 items-center justify-end">
                  <a href="#" class="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
                    <img src="https://tailwindui.com/img/flags/flag-canada.svg" alt="" class="block h-auto w-5 flex-shrink-0" />
                    <span class="ml-3 block text-sm font-medium">CAD</span>
                    <span class="sr-only">, change currency</span>
                  </a>

                  {/* <!-- Search --> */}
                  <a href="#" class="ml-6 hidden p-2 text-gray-400 hover:text-gray-500 lg:block">
                    <span class="sr-only">Search</span>
                    {/* <!-- Heroicon name: outline/magnifying-glass --> */}
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </a>

                  {/* <!-- Account --> */}
                  <a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
                    <span class="sr-only">Account</span>
                    {/* <!-- Heroicon name: outline/user --> */}
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </a>

                  {/* <!-- Cart --> */}
                  <div class="ml-4 flow-root lg:ml-6">
                    <a href="#" class="group -m-2 flex items-center p-2">
                      {/* <!-- Heroicon name: outline/shopping-bag --> */}
                      <svg class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                      <span class="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main class="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
          <div class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div class="lg:col-span-5 lg:col-start-8">
              <div class="flex justify-between">
                <h1 class="text-xl font-medium text-gray-900">Basic Tee</h1>
                <p class="text-xl font-medium text-gray-900">$35</p>
              </div>
              {/* <!-- Reviews --> */}
              <div class="mt-4">
                <h2 class="sr-only">Reviews</h2>
                <div class="flex items-center">
                  <p class="text-sm text-gray-700">
                    3.9
                    <span class="sr-only"> out of 5 stars</span>
                  </p>
                  <div class="ml-1 flex items-center">
                    {/* <!--
                      Heroicon name: mini/star

                      Active: "text-yellow-400", Inactive: "text-gray-200"
                    --> */}
                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>

                    {/* <!-- Heroicon name: mini/star --> */}
                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>

                    {/* <!-- Heroicon name: mini/star --> */}
                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>

                    {/* <!-- Heroicon name: mini/star --> */}
                    <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>

                    {/* <!-- Heroicon name: mini/star --> */}
                    <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div aria-hidden="true" class="ml-4 text-sm text-gray-300">·</div>
                  <div class="ml-4 flex">
                    <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">See all 512 reviews</a>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Image gallery --> */}
            <div class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 class="sr-only">Images</h2>

              <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg" alt="Back of women&#039;s Basic Tee in black." class="lg:col-span-2 lg:row-span-2 rounded-lg" />

                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-01.jpg" alt="Side profile of women&#039;s Basic Tee in black." class="hidden lg:block rounded-lg" />

                <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-product-shot-02.jpg" alt="Front of women&#039;s Basic Tee in black." class="hidden lg:block rounded-lg" />
              </div>
            </div>

            <div class="mt-8 lg:col-span-5">
              <form>
                {/* <!-- Color picker --> */}
                <div>
                  <h2 class="text-sm font-medium text-gray-900">Color</h2>

                  <fieldset class="mt-2">
                    <legend class="sr-only">Choose a color</legend>
                    <div class="flex items-center space-x-3">
                      {/* <!--
                        Active and Checked: "ring ring-offset-1"
                        Not Active and Checked: "ring-2"
                      --> */}
                      <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-900">
                        <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-0-label" />
                        <span id="color-choice-0-label" class="sr-only"> Black </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-gray-900 border border-black border-opacity-10 rounded-full"></span>
                      </label>

                      {/* <!--
                        Active and Checked: "ring ring-offset-1"
                        Not Active and Checked: "ring-2"
                      --> */}
                      <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                        <input type="radio" name="color-choice" value="Heather Grey" class="sr-only" aria-labelledby="color-choice-1-label" />
                        <span id="color-choice-1-label" class="sr-only"> Heather Grey </span>
                        <span aria-hidden="true" class="h-8 w-8 bg-gray-400 border border-black border-opacity-10 rounded-full"></span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                {/* <!-- Size picker --> */}
                <div class="mt-8">
                  <div class="flex items-center justify-between">
                    <h2 class="text-sm font-medium text-gray-900">Size</h2>
                    <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">See sizing chart</a>
                  </div>

                  <fieldset class="mt-2">
                    <legend class="sr-only">Choose a size</legend>
                    <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {/* <!--
                        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                        Active: "ring-2 ring-offset-2 ring-indigo-500"
                        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                      --> */}
                      <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                        <input type="radio" name="size-choice" value="XXS" class="sr-only" aria-labelledby="size-choice-0-label" />
                        <span id="size-choice-0-label">XXS</span>
                      </label>

                      {/* <!--
                        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                        Active: "ring-2 ring-offset-2 ring-indigo-500"
                        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                      --> */}
                      <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                        <input type="radio" name="size-choice" value="XS" class="sr-only" aria-labelledby="size-choice-1-label" />
                        <span id="size-choice-1-label">XS</span>
                      </label>

                      {/* <!--
                        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                        Active: "ring-2 ring-offset-2 ring-indigo-500"
                        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                      --> */}
                      <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                        <input type="radio" name="size-choice" value="S" class="sr-only" aria-labelledby="size-choice-2-label" />
                        <span id="size-choice-2-label">S</span>
                      </label>

                      {/* <!--
                        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                        Active: "ring-2 ring-offset-2 ring-indigo-500"
                        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                      --> */}
                      <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                        <input type="radio" name="size-choice" value="M" class="sr-only" aria-labelledby="size-choice-3-label" />
                        <span id="size-choice-3-label">M</span>
                      </label>

                      {/* <!--
                        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                        Active: "ring-2 ring-offset-2 ring-indigo-500"
                        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                      --> */}
                      <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                        <input type="radio" name="size-choice" value="L" class="sr-only" aria-labelledby="size-choice-4-label" />
                        <span id="size-choice-4-label">L</span>
                      </label>

                      {/* <!--
                        In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                        Active: "ring-2 ring-offset-2 ring-indigo-500"
                        Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                      --> */}
                      <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-25 cursor-not-allowed">
                        <input type="radio" name="size-choice" value="XL" disabled class="sr-only" aria-labelledby="size-choice-5-label" />
                        <span id="size-choice-5-label">XL</span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <button type="submit" class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to cart</button>
              </form>

              {/* <!-- Product details --> */}
              <div class="mt-10">
                <h2 class="text-sm font-medium text-gray-900">Description</h2>

                <div class="prose prose-sm mt-4 text-gray-500">
                  <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
                  <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
                </div>
              </div>

              <div class="mt-8 border-t border-gray-200 pt-8">
                <h2 class="text-sm font-medium text-gray-900">Fabric &amp; Care</h2>

                <div class="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    <li>Only the best materials</li>

                    <li>Ethically and locally made</li>

                    <li>Pre-washed and pre-shrunk</li>

                    <li>Machine wash cold with similar colors</li>
                  </ul>
                </div>
              </div>

              {/* <!-- Policies --> */}
              <section aria-labelledby="policies-heading" class="mt-10">
                <h2 id="policies-heading" class="sr-only">Our Policies</h2>

                <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                      {/* <!-- Heroicon name: outline/globe-americas --> */}
                      <svg class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
                      </svg>
                      <span class="mt-4 text-sm font-medium text-gray-900">International delivery</span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">Get your order in 2 years</dd>
                  </div>

                  <div class="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                    <dt>
                      {/* <!-- Heroicon name: outline/currency-dollar --> */}
                      <svg class="mx-auto h-6 w-6 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="mt-4 text-sm font-medium text-gray-900">Loyalty rewards</span>
                    </dt>
                    <dd class="mt-1 text-sm text-gray-500">Don&#039;t look at other tees</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>

          {/* <!-- Reviews --> */}
          <section aria-labelledby="reviews-heading" class="mt-16 sm:mt-24">
            <h2 id="reviews-heading" class="text-lg font-medium text-gray-900">Recent reviews</h2>

            <div class="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
              <div class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div class="flex items-center xl:col-span-1">
                    <div class="flex items-center">
                      {/* <!--
                        Heroicon name: mini/star

                        Active: "text-yellow-400", Inactive: "text-gray-200"
                      --> */}
                      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>

                      {/* <!-- Heroicon name: mini/star --> */}
                      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>

                      {/* <!-- Heroicon name: mini/star --> */}
                      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>

                      {/* <!-- Heroicon name: mini/star --> */}
                      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>

                      {/* <!-- Heroicon name: mini/star --> */}
                      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="ml-3 text-sm text-gray-700">5<span class="sr-only"> out of 5 stars</span></p>
                  </div>

                  <div class="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <h3 class="text-sm font-medium text-gray-900">Can&#039;t say enough good things</h3>

                    <div class="mt-3 space-y-6 text-sm text-gray-500">
                      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
                      <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <p class="font-medium text-gray-900">Risako M</p>
                  <time datetime="2021-01-06" class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">May 16, 2021</time>
                </div>
              </div>

              {/* <!-- More reviews... --> */}
            </div>
          </section>

          {/* <!-- Related products --> */}
          <section aria-labelledby="related-heading" class="mt-16 sm:mt-24">
            <h2 id="related-heading" class="text-lg font-medium text-gray-900">Customers also purchased</h2>

            <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div class="group relative">
                <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg" alt="Front of men&#039;s Basic Tee in white." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                </div>
                <div class="mt-4 flex justify-between">
                  <div>
                    <h3 class="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        Basic Tee
                      </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">Aspen White</p>
                  </div>
                  <p class="text-sm font-medium text-gray-900">$35</p>
                </div>
              </div>

              {/* <!-- More products... --> */}
            </div>
          </section>
        </main>

        <footer aria-labelledby="footer-heading">
          <h2 id="footer-heading" class="sr-only">Footer</h2>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="border-t border-gray-200 py-20">
              <div class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">
                {/* <!-- Image section --> */}
                <div class="col-span-1 md:col-span-2 lg:col-start-1 lg:row-start-1">
                  <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" class="h-8 w-auto" />
                </div>

                {/* <!-- Sitemap sections --> */}
                <div class="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                  <div class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <h3 class="text-sm font-medium text-gray-900">Products</h3>
                      <ul role="list" class="mt-6 space-y-6">
                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Bags</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Tees</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Objects</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Home Goods</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Accessories</a>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 class="text-sm font-medium text-gray-900">Company</h3>
                      <ul role="list" class="mt-6 space-y-6">
                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Who we are</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Sustainability</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Press</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Careers</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Terms &amp; Conditions</a>
                        </li>

                        <li class="text-sm">
                          <a href="#" class="text-gray-500 hover:text-gray-600">Privacy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Customer Service</h3>
                    <ul role="list" class="mt-6 space-y-6">
                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">Contact</a>
                      </li>

                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">Shipping</a>
                      </li>

                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">Returns</a>
                      </li>

                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">Warranty</a>
                      </li>

                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">Secure Payments</a>
                      </li>

                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">FAQ</a>
                      </li>

                      <li class="text-sm">
                        <a href="#" class="text-gray-500 hover:text-gray-600">Find a store</a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* <!-- Newsletter section --> */}
                <div class="mt-12 md:col-span-8 md:col-start-3 md:row-start-2 md:mt-0 lg:col-span-4 lg:col-start-9 lg:row-start-1">
                  <h3 class="text-sm font-medium text-gray-900">Sign up for our newsletter</h3>
                  <p class="mt-6 text-sm text-gray-500">The latest deals and savings, sent to your inbox weekly.</p>
                  <form class="mt-2 flex sm:max-w-md">
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" type="text" autocomplete="email" required class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                    <div class="ml-4 flex-shrink-0">
                      <button type="submit" class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 py-10 text-center">
              <p class="text-sm text-gray-500">&copy; 2021 Your Company, Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* <Debug php="single.php" react="Single" /> */}
    </>
  );

  // --------------------------------------------
};