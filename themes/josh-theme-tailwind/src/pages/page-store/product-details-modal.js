import React, { useState, useEffect, useRef } from 'react';


// ==============================================


export default function ProductDetailsModal({product, addToCart, closeModal, modal_ref}) {

  // --------------------------------------------

  const {id, title, permalink, price} = product;

  const addToCartHandler = (e) => {
    e.preventDefault(); // don't submit form
    addToCart(product);
  };

  // --------------------------------------------

  return(   
    <>
      {/* Modal is actually a full-screen overlay. */}
      {/* Inside the overlay is a container that stores the modal. */}
      {/* You simply apply the gsap animation to the modal_ref (which is actually the overlay) 
      and this handles both the modal and overlay */}
      {/* We apply event.stopPropagation() to stop the event-bubbling of the event when the user clicks the internal container. */}
      {/* We only want the modal to close when the user clicks outside the modal, so applying an event listern on the outer modal and stopping event-bubbling as described in the previous step on the internal container achieves this.  Event-Capturing phase is disabled by default and of no interest to us here. */}
      <div 
        ref={modal_ref} 
        style={{ 
          display: 'none',  // open => grid
          placeItems: 'center', 
          opacity: 0, 
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          width: '100vw', 
          height: '100vh', 
          minWidth: '350px',
          position: 'fixed', 
          zIndex: '10', 
          top: 0, 
          left: 0, 
          overflowY: 'scroll',
          padding: '50px 0',
        }}
        onClick={(e) => {
          console.log('clicked overlay outside of modal => close modal');
          closeModal();
        }}
      >

        <div 
          onClick={(e) => e.stopPropagation()}
          class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
        >
          <div       
            style={{ 
              borderRadius: '5px',
            }} 
          class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          {/* <div class="relative flex w-full items-center overflow-hidden px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"> */}
            <button
              onClick={() => {
                console.log('clicked close modal (X) button => close modal');
                closeModal();
              }} 
              type="button" 
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
            >
              <span class="sr-only">Close</span>
              {/* <!-- Heroicon name: outline/x-mark --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* <div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8"> */}
            <div class="grid w-full items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
              <div class="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img 
                  style={{ margin: 0}}
                  src="https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg" alt="Back of women&#039;s Basic Tee in black." class="object-cover object-center" />
              </div>
              <div class="sm:col-span-8 lg:col-span-7">
                {/* <h2 class="text-xl font-medium text-gray-900 sm:pr-12">Women&#039;s Basic Tee</h2> */}
                <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{title}</h2>

                <section aria-labelledby="information-heading" class="mt-1">
                { 
                  /* 
                    <h3 id="information-heading" class="sr-only">Product information</h3>
                    <p class="font-medium text-gray-900">$32</p> 
                  */
                }

                  <h3 id="information-heading" class="sr-only">Product information</h3>
                  <p class="text-2xl text-gray-900">${price}</p>


                  {/* <!-- Reviews --> */}
                  <div class="mt-4">
                    <h4 class="sr-only">Reviews</h4>
                    <div class="flex items-center">
                      <p class="text-sm text-gray-700">
                        3.9
                        <span class="sr-only"> out of 5 stars</span>
                      </p>
                      <div class="ml-1 flex items-center">
                        {/* <!--
                          Heroicon name: mini/star

                          Active: "text-yellow-400", Default: "text-gray-200"
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
                      <div class="ml-4 hidden lg:flex lg:items-center">
                        <span class="text-gray-300" aria-hidden="true">&middot;</span>
                        <a href="#" class="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">See all 512 reviews</a>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Description --> */}
                  <div class="mt-6">
                    <h4 class="sr-only">Description</h4>

                    <p class="text-sm text-gray-700">The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
                  </div>
                </section>

                <section aria-labelledby="options-heading" class="mt-8">
                  <h3 id="options-heading" class="sr-only">Product options</h3>

                  <form>
                    {/* <!-- Color picker --> */}
                    <div>
                      <h4 class="text-sm font-medium text-gray-900">Color</h4>

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
                        <h4 class="text-sm font-medium text-gray-900">Size</h4>
                        <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                      </div>

                      <fieldset class="mt-2">
                        <legend class="sr-only">Choose a size</legend>
                        <div class="grid grid-cols-7 gap-2">
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
                          <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none">
                            <input type="radio" name="size-choice" value="XL" class="sr-only" aria-labelledby="size-choice-5-label" />
                            <span id="size-choice-5-label">XL</span>
                          </label>

                          {/* <!--
                            In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
                            Active: "ring-2 ring-offset-2 ring-indigo-500"
                            Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
                          --> */}
                          <label class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 opacity-25 cursor-not-allowed">
                            <input type="radio" name="size-choice" value="XXL" disabled class="sr-only" aria-labelledby="size-choice-6-label" />
                            <span id="size-choice-6-label">XXL</span>
                          </label>
                        </div>
                      </fieldset>
                    </div>

                    <button
                      onClick={addToCartHandler} 
                      type="submit" 
                      class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to bag
                    </button>

                    <p class="absolute top-4 left-4 text-center sm:static sm:mt-8">
                      <a 
                        // onClick={(e) => e.preventDefault()}
                        href={permalink} 
                        class="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        View full details
                      </a>
                    </p>
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );

}