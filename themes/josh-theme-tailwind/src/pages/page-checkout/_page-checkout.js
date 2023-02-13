import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';

import { lc, lg, lo, lp, lb, lr, ly } from '../../util/log';
import { getLS, setLS } from '../../util/local-storage';
import { fireEvent } from '../../util/custom-event';
import { fetchGET, fetchPOST } from '../../util/fetch';

// ==============================================

// Local Storage:
const getCartLS = () => getLS('cart');
const updateCartLS = (cart) => setLS('cart', cart);

// ==============================================

export default function PageCheckout() {

  // --------------------------------------------

  // -Cart is used here to syncrhonize with the cart state in the _header component (rendered in completely different part of app)
  // -If user updates quantity of items in cart while on this page we want the contents of the checkout to update accordingly.
  // -If the user changes quantity of items in cart then the correspnding cart events are fired then we need to update the cart state in this component.
  //  --this is achieved with the event listeners that will update the local cart state (handler: updateLocalCartState).
  const [cart, setCart] = useState([]);

  // Page load:
  //  -Initial load of cart from LS to set local 'cart' state in this component.
  //  --TODO: Synchronize the data with the cart on the cart custom events in case user updates quantity of items in cart while on this page.
  useEffect(() => {

    // Check local storage for cart:
    const updateLocalCartState = () => {
      const ls_cart = getCartLS();
      if (ls_cart !== null) {
        setCart(ls_cart);
      }
    };
    updateLocalCartState();

    window.addEventListener('cart-add', updateLocalCartState);
    window.addEventListener('cart-remove', updateLocalCartState);

    return () => {
      window.removeEventListener('cart-add', updateLocalCartState);
      window.removeEventListener('cart-remove', updateLocalCartState);
    };
  }, []);

  // --------------------------------------------

  // NOTE: Need to be able to remove line item from cart also by clicking "Remove" button in checkout line-item.
  //  -Click "Remove"
  //    --Run removeFromCart(id) but don't set state because by firing the cart-remove event the updateLocalCartState is called to set local cart state.
  //    --the cart-remove event firing syncrhonizes the cart state in the cart-drawer because it is listening for that event.
  const removeFromCart = (id) => {
    lg('removeFromCart() in _page-checkout.js');
    const new_cart = cart.filter(item => item.id !== id);
    updateCartLS(new_cart);
    // setCart(new_cart);
    fireEvent('cart-remove');
  }

  // --------------------------------------------
  
  // [Custom Endpoint(s)] 
  //  -1. Send to Node (Stripe)
  //  -2. Send to PHP (Order CPT + Orders Table)
  const submitOrderToPHP = async () => {

    lo('submit order');

    const body = {
      josh: 'josh',
      cart,
    };

    console.log('cart sending to backend (req): ', body);

    // const data = await fetchPOST('http://jadefse.local/wp-json/josh/v1/order', body);
    const data = await fetchPOST(`${PHP.rest_url}/order`, body);

    console.log('data from backend (res): ', data);

    if (data.status === 2) { // success
      console.log('data: ', data);
      // log('response: ', data ), 'green';
    }
    else {
      console.error('data: ', data );
    }
  };

   // --------------------------------------------

  const submitOrderToNode = async () => {

    console.log('2. submitOrderToNode()');

    // fetch(`http://localhost:4242/create-checkout-session`, {
    // fetch(`https://ecommerce-nodejs.herokuapp.com/api/checkout/stripe-checkout`, {
    // fetch(`http://localhost:9000/api/checkout/stripe-checkout`, {

    let url = `${PHP.api_url_prod}/api/checkout/stripe-checkout-wp`;

    if (process.env.NODE_ENV === 'development') {
      url = `${PHP.api_url_dev}/api/checkout/stripe-checkout-wp`;
    }

    console.log('3. submitting cart to url: ', url);
    console.log('4. cart: ', cart);

    const data = fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": 'application/json',
        // "X-WP-Nonce": PHP.nonce,
      },
      body: JSON.stringify({ cart }),
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch(e => {
        console.error(e.error);
      });



    // try {
    //   const data = await fetchPOST(url, { cart });
    //   console.log('5. data: ', data);
    //   window.location = data.url;
    // } catch(e) {
    //   console.warn('5. error making request to Node, error: ', e);
    // }


    

  };

  // --------------------------------------------
  
  const submitStripe = () => {

    console.log('1. submitStripe()');

    // (async) Step 1: Store in DB
    // submitOrderToPHP();

    // (async) Step 2: 
    submitOrderToNode();
  };
  
  // --------------------------------------------
  return (
    <div class="bg-white ">

      {/* TODO: Fix */}
      <div style={{ height: '150px', background: 'white'}}></div>

      <main class="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
        <h1 class="sr-only">Checkout</h1>
    
        <div class="mx-auto grid max-w-lg grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div class="mx-auto w-full max-w-lg">
            <h2 class="sr-only">Order summary</h2>
    
            <div class="flow-root">
              <ul role="list" class="-my-6 divide-y divide-gray-200">

                { cart.length > 0 && cart.map((item) => {
                  const {id, title, permalink, price, categories, color, rating, qty } = item;
                  return (
                    <li key={`cart-line-item-${id}`} class="flex space-x-6 py-6">
                      <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-05-product-01.jpg" alt="Front of women&#039;s basic tee in heather gray." class="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center" />
                      <div class="flex-auto">
                        <div class="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                          <div class="flex-auto space-y-1 text-sm font-medium">
                            <h3 class="text-gray-900">
                              <a href="#">{title}</a>
                            </h3>
                            <p class="text-gray-900">${price}</p>
                            <p class="hidden text-gray-500 sm:block">Gray</p>
                            <p class="hidden text-gray-500 sm:block">S</p>
                          </div>
                          <div class="flex flex-none space-x-4">
                            {/* <button type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Edit</button> */}
                            <div class="flex border-gray-300 pl-4">
                              <button onClick={() => removeFromCart(id)} type="button" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                }) }
    
                {/* <!-- More products... --> */}
              </ul>
            </div>
    
            <dl class="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div class="flex justify-between">
                <dt>Subtotal</dt>
                <dd class="text-gray-900">$104.00</dd>
              </div>
              <div class="flex justify-between">
                <dt>Taxes</dt>
                <dd class="text-gray-900">$8.32</dd>
              </div>
              <div class="flex justify-between">
                <dt>Shipping</dt>
                <dd class="text-gray-900">$14.00</dd>
              </div>
              <div class="flex justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt class="text-base">Total</dt>
                <dd class="text-base">$126.32</dd>
              </div>
            </dl>
          </div>
    
          <div class="mx-auto w-full max-w-lg">
            <button type="button" class="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
              <span class="sr-only">Pay with Apple Pay</span>
              <svg class="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20">
                <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
              </svg>
            </button>
    
            <div class="relative mt-8">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-4 text-sm font-medium text-gray-500">or</span>
              </div>
            </div>
    
            <div class="mt-6">
              <h2 class="text-lg font-medium text-gray-900">Contact information</h2>
    
              <div class="mt-6">
                <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                  <input type="email" id="email-address" name="email-address" autocomplete="email" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>
    
              <div class="mt-6">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone number</label>
                <div class="mt-1">
                  <input type="text" name="phone" id="phone" autocomplete="tel" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>
              </div>
    
              <div class="mt-6 flex space-x-2">
                <div class="flex h-5 items-center">
                  <input id="terms" name="terms" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                </div>
                <label for="terms" class="text-sm text-gray-500">I have read the terms and conditions and agree to the sale of my personal information to the highest bidder.</label>
              </div>
    
              {/* <!-- Submit button, enable/disable based on form state --> */}
              <button 
                onClick={submitStripe}
                disabled={false} 
                class="mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
              >
                Continue
              </button>

            </div>
    
            <div class="mt-10 divide-y divide-gray-200 border-t border-b border-gray-200">
              <button type="button" disabled class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">Payment details</button>
              <button type="button" disabled class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">Shipping address</button>
              <button type="button" disabled class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">Billing address</button>
              <button type="button" disabled class="w-full cursor-auto py-6 text-left text-lg font-medium text-gray-500">Review</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}