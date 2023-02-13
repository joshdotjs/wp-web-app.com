import React, { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

import { init } from "../../util/basic";

const duration = 0.25;

// ==============================================

export default function MobileFilters({ 
  filters, closeMobileFilters, filterChangeHandler,
  categories, 
  tags, 
  colors, 
  sizes, 

  mobile_filters_overlay_ref,
  mobile_filters_open,
}) {

  // --------------------------------------------

  const [show_filters, setShowFilters] = useState(init(6, true));

  // --------------------------------------------

  const refs = useRef([
    // { ref: null, tl: null }, // departments
    // { ref: null, tl: null }, // tags
    { ref: null, tl: null }, // categories
    { ref: null, tl: null }, // colors
    { ref: null, tl: null }, // sizes
    { ref: null, tl: null }, // price
  ]); // show/hide filters

  // --------------------------------------------

  const showHandler = (idx) => (e) => {

    const elem = e.target;

    // disable double click:
    elem.style.pointerEvents = 'none';
    setTimeout(() => elem.style.pointerEvents = 'auto', 3 * duration * 1e3);

    setShowFilters((prev) => {
              
      const categories = refs.current[idx].ref;
      
      const curr = !(prev[idx]);
      
      if (curr === false) {

        const tl = gsap.timeline();

        tl.to(
          categories, {
            opacity: 0,
            duration,
          }
        );

        // tl.to(checkboxes, { height: 0 });

        tl.to(categories, {
          height: 0,
          paddingTop: 0,
          onComplete: () => {
            categories.style.display = 'none';
          },
          duration
        });

        refs.current[idx].tl = tl;

      } else {

        categories.style.display = 'block';
        refs.current[idx].tl?.reverse();

      }

      const clone = [...prev];
      clone[idx] = curr;
      return clone;
    });

  };

  // --------------------------------------------
  
  const portal_root = document.querySelector('#react-portal-mobile-filters');
  
  // --------------------------------------------

  return createPortal( // portals preserve event delegation
    <div 
      id="portal-mobile-filters__container" // only used for documentation
      class="relative z-40 lg:hidden"
      role="dialog" aria-modal="true"
    > 

      <div // overlay
        ref={mobile_filters_overlay_ref}
        onClick={() => {
          closeMobileFilters();
        }}
        class="fixed inset-0 bg-black bg-opacity-90"
        style={{ 
          display: 'none', 
          opacity: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(5px)', // Hey - I think this is not animating the blur!  I think a single blur is computed and then the opacity on it is animated - which is efficient.  I think animating a blur causes a diffrent blur to be computed for each frame of the animation with each one slightly more blurred than the previous.
        }}
        >  

      </div>


      <div // drawer
        class={
          `
            fixed z-40 flex
            ${!mobile_filters_open ? 'translate-x-full' : 'translate-x-0'} ease-in-out duration-300
          `
        }
        style={{
          top: 0,
          right: 0,
          width: '300px',
          // minHeight: '100vh',
          height: '100vh'
        }}
      > 

        <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div class="flex items-center justify-between px-4">
            <h2 class="text-lg font-medium text-gray-900">Filters</h2>
            <button // Close (mobile) filters button 
              onClick={() => closeMobileFilters()}
              type="button" 
              class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span class="sr-only">Close menu</span>
              {/* <!-- Heroicon name: outline/x-mark --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* <!-- Filters --> */}
          <form class="mt-4 border-t border-gray-200">

            {/* ------------------------------------------- */}

            {/* <h3 class="sr-only">Categories</h3> */}
            <ul role="list" class="px-2 py-3 font-medium text-gray-900">

              <li 
                // key={`filter-tag-all-0`}
                onClick={() => {
                  const target = { type: 'radio', name: 'tags', value: tags.map(({slug}) => slug) };
                  filterChangeHandler({ target });
                }}
              >
                <button class="block px-2 py-3">Current Collection</button>
              </li>


              {tags.length > 0 && tags.map(({ title: label, slug: value, detailed }, idx) => {
          
                const key = `filter-tag-${value}-${idx}-mobile`;

                return (
                  <li 
                    key={key}
                    onClick={() => {
                      const target = { type: 'radio', name: 'tags', value };
                      filterChangeHandler({ target });
                    }}
                  >
                    {/* <a href="#">{string_mapping[value]}</a> */}
                    <button class="block px-2 py-3">{detailed}</button>
                  </li>
                );
              })}
              
            </ul>

            {/* ------------------------------------------- */}

            <div // filters: categories 
              class="border-t border-gray-200 px-4 py-6"> 
              <h3 class="-mx-2 -my-3 flow-root">
                
                {/* <!-- Expand/collapse section button --> */}
                <button 
                  onClick={showHandler(0)}
                  type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false"
                >
                  
                  <span class="font-medium text-gray-900">
                    Category
                    {filters.getCategories().length > 0 ? ` (${filters.getCategories().length})` : null}
                  </span>
                  
                  <span class="ml-6 flex items-center">

                    <svg // Expand icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>

                    <svg // Collapse icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                    </svg>

                  </span>

                </button>
              </h3>


              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div // checkboxes
                ref={el => refs.current[0].ref = el}
                class="pt-6" 
              >
                <div class="space-y-6">

                  {categories.length > 0 && categories.map(({ title: label, slug: value }, idx) => { 
                
                    const key = `filter-category-${value}-${idx}`;
                    
                    return (
                      <div 
                        key={key}
                        class="flex items-center"
                      >
                        <input 
                          onChange={(e) => {
                            // console.log('clicked: ', e.target);
                            filterChangeHandler(e);
                          }}
                          checked={filters['categories'].has(value)}
                          name='categories' 
                          value={value} 
                          type="checkbox"
                          id={key}
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for={key} class="ml-3 min-w-0 flex-1 text-gray-500">{ label }</label>
                      </div>
                    );
                  })}

                </div>
              </div>

            </div>

            {/* ------------------------------------------- */}

            <div // filters: colors 
              class="border-t border-gray-200 px-4 py-6"> 
              <h3 class="-mx-2 -my-3 flow-root">
                
                {/* <!-- Expand/collapse section button --> */}
                <button 
                  onClick={showHandler(1)}
                  type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false"
                >
                  
                  <span class="font-medium text-gray-900">
                    Color
                    {filters.getColors().length > 0 ? ` (${filters.getColors().length})` : null}
                  </span>
                  
                  <span class="ml-6 flex items-center">

                    <svg // Expand icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>

                    <svg // Collapse icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                    </svg>

                  </span>

                </button>
              </h3>


              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div // checkboxes
                ref={el => refs.current[1].ref = el}
                class="pt-6"
              >
                <div class="space-y-6">

                  {colors.length > 0 && colors.map(({ title: label, slug: value }, idx) => { 
                
                    const key = `filter-color-${value}-${idx}`;
                    
                    return (
                      <div 
                        key={key}
                        class="flex items-center"
                      >
                        <input 
                          onChange={(e) => {
                            // console.log('clicked: ', e.target);
                            filterChangeHandler(e);
                          }}
                          checked={filters['colors'].has(value)}
                          name='colors' 
                          value={value} 
                          type="checkbox"
                          id={key}
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for={key} class="ml-3 min-w-0 flex-1 text-gray-500">{ label }</label>
                      </div>
                    );
                  })}

                </div>
              </div>

            </div>

            {/* ------------------------------------------- */}

            <div // filters: sizes 
              class="border-t border-gray-200 px-4 py-6"> 
              <h3 class="-mx-2 -my-3 flow-root">
                
                {/* <!-- Expand/collapse section button --> */}
                <button 
                  onClick={showHandler(2)}
                  type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false"
                >
                  
                  <span class="font-medium text-gray-900">
                    Size
                    {filters.getSizes().length > 0 ? ` (${filters.getSizes().length})` : null}
                  </span>
                  
                  <span class="ml-6 flex items-center">

                    <svg // Expand icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>

                    <svg // Collapse icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                    </svg>

                  </span>

                </button>
              </h3>


              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div // checkboxes
                ref={el => refs.current[2].ref = el}
                class="pt-6" 
              >
                <div class="space-y-6">

                  {sizes.length > 0 && sizes.map(({ title: label, slug: value }, idx) => { 
                
                    const key = `filter-sizes-${value}-${idx}`;
                    
                    return (
                      <div 
                        key={key}
                        class="flex items-center"
                      >
                        <input 
                          onChange={(e) => {
                            // console.log('clicked: ', e.target);
                            filterChangeHandler(e);
                          }}
                          checked={filters['sizes'].has(value)}
                          name='sizes' 
                          value={value} 
                          type="checkbox"
                          id={key}
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label for={key} class="ml-3 min-w-0 flex-1 text-gray-500">{ label }</label>
                      </div>
                    );
                  })}

                </div>
              </div>

            </div>

            {/* ------------------------------------------- */}

            <div // filters: prices 
              class="border-t border-b border-gray-200 px-4 py-6"> 
              <h3 class="-mx-2 -my-3 flow-root">
                
                {/* <!-- Expand/collapse section button --> */}
                <button 
                  onClick={showHandler(3)}
                  type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false"
                >
                  
                  <span class="font-medium text-gray-900">
                    Price
                  </span>
                  
                  <span class="ml-6 flex items-center">

                    <svg // Expand icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>

                    <svg // Collapse icon
                      class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                    </svg>

                  </span>

                </button>
              </h3>


              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div // checkboxes
                ref={el => refs.current[3].ref = el}
                class="pt-6" 
              >
                <div class="space-y-6">

                  <div class="flex items-center">

                    <div class="mr-4">
                      <label for="price-filter-min" class="block text-sm font-medium text-gray-700">Minimum</label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span class="text-gray-500 sm:text-sm">$</span>
                        </div>
                        
                        <input // price filter - min
                          onChange={(e) => {
                            // console.log('clicked: ', e.target);
                            filterChangeHandler(e);
                          }}
                          value={filters['price'].min}
                          type="number" 
                          name="price-min" 
                          id="price-filter-min-mobile" 
                          class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                          placeholder="0.00" aria-describedby="price-filter-min-currency-mobile" 
                        />
                        
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-gray-500 sm:text-sm" id="price-filter-min-currency-mobile">USD</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label for="price-filter-max-mobile" class="block text-sm font-medium text-gray-700">Maximum</label>
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span class="text-gray-500 sm:text-sm">$</span>
                        </div>

                        <input // price filter - max
                          onChange={(e) => {
                            // console.log('clicked: ', e.target);
                            filterChangeHandler(e);
                          }}
                          value={filters['price'].max}
                          type="number" 
                          name="price-max" 
                          id="price-filter-max-mobile" 
                          class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                          placeholder="0.00" aria-describedby="price-filter-max-currency"
                        />
                        
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span class="text-gray-500 sm:text-sm" id="price-filter-max-currency-mobile">USD</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* ------------------------------------------- */}


          </form>
        </div>
      </div>
    </div>,
    portal_root
  );

}