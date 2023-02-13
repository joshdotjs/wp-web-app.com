import React, { useState, useEffect, useRef } from "react";


import StoreFiltersDesktop from "./filters-desktop";
import Product from './product';

import SortDropdownSelect from './store-main--sort-dropdown';

// ==============================================

// const string_mapping = { new: 'New Arrivals', sale: 'On Sale', featured: 'Featured Items' };

// ==============================================

export default function Main({ 
    products, 
    openMobileFilters,
    categories, 
    tags, 
    colors, 
    sizes, 
    filters,  filterChangeHandler,
    num_active_filters,

    updateProducts, setSort,
}) {

  // --------------------------------------------
  

  return (
    <main
      style={{ paddingTop: '100px' }} 
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
        
        <h1 class="text-4xl font-bold tracking-tight text-gray-900  truncate mr-8">

          {filters.getDepartments().length === 1 && filters.getDepartment() } 
          { filters.getTags().length === 1 
            &&
              <>
                {filters.getDepartments().length === 1 && <span class="font-light  hidden  sm:inline">{' '}|{' '}</span>}
                <span class="font-light text-3xl    hidden  sm:inline">{tags.filter(tag => tag.slug === filters.getTag())?.[0]?.['detailed']}</span>
              </>
          }
          </h1>

        <div class="flex items-center">
          
            <SortDropdownSelect { ...{ updateProducts, setSort } }/>
          
          <div 
            class="ml-4 sm:ml-6 p-2"
          >
            <button
              onClick={() => openMobileFilters()} 
              type="button" 
              class="group flex items-center text-sm font-medium text-gray-700 hover:text-gray-900" 
              aria-controls="disclosure-1" 
              aria-expanded="false"
            >
              {/* <!-- Heroicon name: mini/funnel --> */}
              
              <span>
                { num_active_filters } active filter
                { num_active_filters !== 1 && 's'}
              </span>
              <svg 
                class="lg:hidden -mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
              </svg>
              
            </button>
          </div>

        </div>
      </div>

      <section aria-labelledby="products-heading" class="pt-6 pb-24">
        <h2 id="products-heading" class="sr-only">Products</h2>

        <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

          {/* <!-- Filters --> */}
          <StoreFiltersDesktop { ...{ 
              categories, 
              tags, 
              colors, 
              sizes, 
              filters,  filterChangeHandler,
            } } 
          />

          {/* <!-- Product grid --> */}
          <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
            
            {/* <a href="#" class="group text-sm">
              <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img src="https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg" alt="White fabric pouch with white zipper, black zipper pull, and black elastic loop." class="h-full w-full object-cover object-center" />
              </div>
              <h3 class="mt-4 font-medium text-gray-900">Nomad Pouch</h3>
              <p class="italic text-gray-500">White and Black</p>
              <p class="mt-2 font-medium text-gray-900">$50</p>
            </a> */}


            {products.length > 0 && products.map((product) => <Product {...{ product }}/>)}
            

          </div>
        </div>
      </section>
    </main>
)};

// ==============================================