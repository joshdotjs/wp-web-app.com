import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';

import { init } from "../../util/basic";

const duration = 0.25;

// ==============================================

export default function StoreFiltersDesktop({ 
  categories, 
  tags, 
  colors, 
  sizes, 
  filters,  filterChangeHandler,
}) {

  // --------------------------------------------
  
  const [show_filters, setShowFilters] = useState(init(6, true));

  // --------------------------------------------

  const refs = useRef([
    // { ref: null, tl: null }, // departments
    { ref: null, tl: null }, // tags
    { ref: null, tl: null }, // colors
    { ref: null, tl: null }, // categories
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

  return (
    <form class="hidden lg:block">

      {/* ------------------------------------------- */}

      {/* <h3 class="sr-only">Tags</h3> */}

      <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">


        <li 
          // key={`filter-tag-all-0`}
          onClick={() => {
            const target = { type: 'radio', name: 'tags', value: tags.map(({slug}) => slug) };
            filterChangeHandler({ target });
          }}
        >
          <a href="#">Current Collection</a>
        </li>

        {tags.length > 0 && tags.map(({ title: label, slug: value, detailed }, idx) => {
          
          const key = `filter-tag-${value}-${idx}`;

          return (
            <li 
              key={key}
              onClick={() => {
                const target = { type: 'radio', name: 'tags', value };
                filterChangeHandler({ target });
              }}
            >
              {/* <a href="#">{string_mapping[value]}</a> */}
              <a href="#">{detailed}</a>
            </li>
          );
        })}

      </ul>

      {/* ------------------------------------------- */}

      <div // filters: colors 
        class="border-b border-gray-200 py-6">

        <h3 class="-my-3 flow-root">
          {/* <!-- Expand/collapse section button --> */}
          <button 
            onClick={showHandler(0)}
            type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
            <span class="font-medium text-gray-900">
              Color 
              {filters.getColors().length > 0 ? ` (${filters.getColors().length})` : null}
            </span>
            <span class="ml-6 flex items-center">
              <svg // Expand icon
                class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>

              <svg // Collapse icon
                class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              >
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

          <div class="space-y-4">

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
                  <label for={key} class="ml-3 text-sm text-gray-600">{ label }</label>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}

      <div // filters: categories 
        class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          {/* <!-- Expand/collapse section button --> */}
          <button 
            onClick={showHandler(1)}
            type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false"
          >
            <span class="font-medium text-gray-900">
              Category
              {filters.getCategories().length > 0 ? ` (${filters.getCategories().length})` : null}
            </span>
            <span class="ml-6 flex items-center">

              <svg // Expand icon
                class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>

              <svg // Collapse icon
                class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              >
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

          <div class="space-y-4">

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
                  <label for={key} class="ml-3 text-sm text-gray-600">{ label }</label>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}

      <div // filters: sizes 
        class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          {/* <!-- Expand/collapse section button --> */}
          <button 
            onClick={showHandler(2)}
            type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false"
          >
            <span class="font-medium text-gray-900">
              Size
              {filters.getSizes().length > 0 ? ` (${filters.getSizes().length})` : null}
            </span>
            <span class="ml-6 flex items-center">
              <svg // Expand icon
                  class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>

                <svg // Collapse icon
                  class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                >
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
          
          <div 
            class="space-y-4"
          >
            
            {sizes.length > 0 && sizes.map(({ title: label, slug: value }, idx) => {
             
             const key = `filter-size-${value}-${idx}`;
             
              return (
                <div 
                  key={key}
                  class="flex items-center">
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
                  <label for={key} class="ml-3 text-sm text-gray-600">{ label }</label>
                </div>
              ); 
            })}

          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}

      <div // filters: price 
        class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          {/* <!-- Expand/collapse section button --> */}
          <button 
            onClick={showHandler(3)}
            type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false"
          >
            <span class="font-medium text-gray-900">Price</span>
            <span class="ml-6 flex items-center">
              <svg // Expand icon
                  class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>

                <svg // Collapse icon
                  class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                >
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
          <div 
            class="space-y-4"
          >
            <div class="flex items-center">
              {/* <input onChange={filterChangeHandler}    checked={filters.sizes.has('2l')}   id="filter-size-0" name="sizes" value="2l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> */}
              {/* <label for="filter-size-0" class="ml-3 text-sm text-gray-600">2L</label> */}

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
                    id="price-filter-min" 
                    class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    placeholder="0.00" aria-describedby="price-filter-min-currency" 
                  />
                  
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span class="text-gray-500 sm:text-sm" id="price-filter-min-currency">USD</span>
                  </div>
                </div>
              </div>

              <div>
                <label for="price-filter-max" class="block text-sm font-medium text-gray-700">Maximum</label>
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
                    id="price-filter-max" 
                    class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" 
                    placeholder="0.00" aria-describedby="price-filter-max-currency"
                  />
                  
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span class="text-gray-500 sm:text-sm" id="price-filter-max-currency">USD</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}

    </form>
  ); 
}