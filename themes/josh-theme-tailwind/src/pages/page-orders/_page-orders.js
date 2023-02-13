import ModalRating from './modal-rating';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../util/log';

// ==============================================

export default function PageOrders() {

  // --------------------------------------------

  return (
    <div class="bg-gray-50">
      <header class="relative bg-white shadow-sm">
        <nav aria-label="Top" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="px-4 pb-14 sm:px-0 sm:pb-0">
            <div class="flex h-16 items-center justify-between">
              {/* <!-- Logo --> */}
              <div class="flex flex-1">
                <a href="#">
                  <span class="sr-only">Your Company</span>
                  <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
              </div>
    

    
              <div class="flex flex-1 items-center justify-end">
                {/* <!-- Search --> */}
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  {/* <!-- Heroicon name: outline/magnifying-glass --> */}
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </a>
    
                {/* <!-- Cart --> */}
                <div class="ml-4 flow-root lg:ml-8">
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
    
      <main class="py-24">
        <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
          <div class="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
            <p class="mt-2 text-sm text-gray-500">Check the status of recent orders, manage returns, and discover similar products.</p>
          </div>
        </div>
    
        <section aria-labelledby="recent-heading" class="mt-16">
          <h2 id="recent-heading" class="sr-only">Recent orders</h2>
          <div class="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div class="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              <div class="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border">
                <h3 class="sr-only">Order placed on <time datetime="2021-07-06">Jul 6, 2021</time></h3>
    
                <div class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                  <dl class="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                    <div>
                      <dt class="font-medium text-gray-900">Order number</dt>
                      <dd class="mt-1 text-gray-500">WU88191111</dd>
                    </div>
                    <div class="hidden sm:block">
                      <dt class="font-medium text-gray-900">Date placed</dt>
                      <dd class="mt-1 text-gray-500">
                        <time datetime="2021-07-06">Jul 6, 2021</time>
                      </dd>
                    </div>
                    <div>
                      <dt class="font-medium text-gray-900">Total amount</dt>
                      <dd class="mt-1 font-medium text-gray-900">$160.00</dd>
                    </div>
                  </dl>
    
                  <div class="relative flex justify-end lg:hidden">
                    <div class="flex items-center">
                      <button type="button" class="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500" id="menu-0-button" aria-expanded="false" aria-haspopup="true">
                        <span class="sr-only">Options for order WU88191111</span>
                        {/* <!-- Heroicon name: outline/ellipsis-vertical --> */}
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </button>
                    </div>
    
                    {/* <!--
                      Dropdown menu, show/hide based on menu state.
    
                      Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                      Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    --> */}
                    <div class="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-0-button" tabindex="-1">
                      <div class="py-1" role="none">
                        {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-0">View</a>
                        <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-0-item-1">Invoice</a>
                      </div>
                    </div>
                  </div>
    
                  <div class="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                    <a href="#" class="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span>View Order</span>
                      <span class="sr-only">WU88191111</span>
                    </a>
                    <a href="#" class="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span>View Invoice</span>
                      <span class="sr-only">for order WU88191111</span>
                    </a>
                  </div>
                </div>
    
                {/* <!-- Products --> */}
                <h4 class="sr-only">Items</h4>
                <ul role="list" class="divide-y divide-gray-200">
                  <li class="p-4 sm:p-6">
                    <div class="flex items-center sm:items-start">
                      <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                        <img src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg" alt="Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps." class="h-full w-full object-cover object-center" />
                      </div>
                      <div class="ml-6 flex-1 text-sm">
                        <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                          <h5>Micro Backpack</h5>
                          <p class="mt-2 sm:mt-0">$70.00</p>
                        </div>
                        <p class="hidden text-gray-500 sm:mt-2 sm:block">Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.</p>
                      </div>
                    </div>
    
                    <div class="mt-6 sm:flex sm:justify-between">
                      <div class="flex items-center">
                        {/* <!-- Heroicon name: mini/check-circle --> */}
                        <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                        </svg>
                        <p class="ml-2 text-sm font-medium text-gray-500">Delivered on <time datetime="2021-07-12">July 12, 2021</time></p>
                      </div>
    
                      <div class="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                        <div class="flex flex-1 justify-center">
                          <a href="#" class="whitespace-nowrap text-indigo-600 hover:text-indigo-500">View product</a>
                        </div>

                    
                        {/* <div class="flex flex-1 justify-center pl-4">
                          <button onClick={() => {
                            submitRating();
                          }}href="#" class="whitespace-nowrap text-indigo-600 hover:text-indigo-500">Leave review</button>
                        </div> */}

                        <ModalRating />


                        <div class="flex flex-1 justify-center pl-4">
                          <a href="#" class="whitespace-nowrap text-indigo-600 hover:text-indigo-500">Buy again</a>
                        </div>
                      </div>
                    </div>
                  </li>
    
                  {/* <!-- More products... --> */}
                </ul>
              </div>
    
              {/* <!-- More orders... --> */}
            </div>
          </div>
        </section>
      </main>
    
    </div>
  );
}