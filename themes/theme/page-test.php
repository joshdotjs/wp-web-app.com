<?php  //  Page: Store  =>  /store

get_header(); ?>

<!-- ======================================== -->

<h2 id="debug-php-file" style="position: fixed; z-index: 100; bottom: 10px; left: 10px; color: white; background: deepskyblue; padding: 0.5rem;">page-test.php</h2>

<!-- <div class="max-w-4xl mx-auto px-4"> -->
  
  
  <!--react component -->
  <!-- <div id="react-theme--page-test"></div> -->
  <!-- endreact component -->
  


<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-50">
  <body class="h-full overflow-hidden">
  ```
-->

<div style="margin-top: 200px;"></div>

<div class="flex h-full">

  <!-- Content area -->
  <div class="flex flex-1 flex-col overflow-hidden">


    <!-- Main content -->
    <div class="flex flex-1 items-stretch overflow-hidden">
      <main class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div class="flex">
            <h1 class="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
            <div class="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
              <button type="button" class="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <!-- Heroicon name: mini/bars-4 -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">Use list view</span>
              </button>
              <button type="button" class="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <!-- Heroicon name: mini/squares-2x2 -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
                </svg>
                <span class="sr-only">Use grid view</span>
              </button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="mt-3 sm:mt-2">
            <div class="sm:hidden">
              <label for="tabs" class="sr-only">Select a tab</label>
              <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
              <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option selected>Recently Viewed</option>
                <option>Recently Added</option>
                <option>Favorited</option>
              </select>
            </div>
            <div class="hidden sm:block">
              <div class="flex items-center border-b border-gray-200">
                <nav class="-mb-px flex flex-1 space-x-6 xl:space-x-8" aria-label="Tabs">
                  <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                  <a href="#" aria-current="page" class="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Recently Viewed</a>

                  <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Recently Added</a>

                  <a href="#" class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Favorited</a>
                </nav>
                <div class="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
                  <button type="button" class="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <!-- Heroicon name: mini/bars-4 -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Use list view</span>
                  </button>
                  <button type="button" class="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <!-- Heroicon name: mini/squares-2x2 -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Use grid view</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
            <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              <li class="relative">
                <!-- Current: "ring-2 ring-offset-2 ring-indigo-500", Default: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500" -->
                <div class="ring-2 ring-offset-2 ring-indigo-500 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                  <!-- Current: "", Default: "group-hover:opacity-75" -->
                  <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-cover pointer-events-none">
                  <button type="button" class="absolute inset-0 focus:outline-none">
                    <span class="sr-only">View details for IMG_4985.HEIC</span>
                  </button>
                </div>
                <p class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">IMG_4985.HEIC</p>
                <p class="pointer-events-none block text-sm font-medium text-gray-500">3.9 MB</p>
              </li>

              <!-- More files... -->
            </ul>
          </section>
        </div>
      </main>

      <!-- Details sidebar -->
      <aside class="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
        <div class="space-y-6 pb-16">
          <div>
            <div class="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg">
              <img src="https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80" alt="" class="object-cover">
            </div>
            <div class="mt-4 flex items-start justify-between">
              <div>
                <h2 class="text-lg font-medium text-gray-900"><span class="sr-only">Details for </span>IMG_4985.HEIC</h2>
                <p class="text-sm font-medium text-gray-500">3.9 MB</p>
              </div>
              <button type="button" class="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <!-- Heroicon name: outline/heart -->
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span class="sr-only">Favorite</span>
              </button>
            </div>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Information</h3>
            <dl class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Uploaded by</dt>
                <dd class="whitespace-nowrap text-gray-900">Marie Culver</dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Created</dt>
                <dd class="whitespace-nowrap text-gray-900">June 8, 2020</dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Last modified</dt>
                <dd class="whitespace-nowrap text-gray-900">June 8, 2020</dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Dimensions</dt>
                <dd class="whitespace-nowrap text-gray-900">4032 x 3024</dd>
              </div>

              <div class="flex justify-between py-3 text-sm font-medium">
                <dt class="text-gray-500">Resolution</dt>
                <dd class="whitespace-nowrap text-gray-900">72 x 72</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Description</h3>
            <div class="mt-2 flex items-center justify-between">
              <p class="text-sm italic text-gray-500">Add a description to this image.</p>
              <button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <!-- Heroicon name: mini/pencil -->
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                <span class="sr-only">Add description</span>
              </button>
            </div>
          </div>
          <div>
            <h3 class="font-medium text-gray-900">Shared with</h3>
            <ul role="list" class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
              <li class="flex items-center justify-between py-3">
                <div class="flex items-center">
                  <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80" alt="" class="h-8 w-8 rounded-full">
                  <p class="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>
                </div>
                <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Remove<span class="sr-only"> Aimee Douglas</span></button>
              </li>

              <li class="flex items-center justify-between py-3">
                <div class="flex items-center">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-8 w-8 rounded-full">
                  <p class="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>
                </div>
                <button type="button" class="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Remove<span class="sr-only"> Andrea McMillan</span></button>
              </li>

              <li class="flex items-center justify-between py-2">
                <button type="button" class="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                    <!-- Heroicon name: mini/plus -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                  </span>
                  <span class="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">Share</span>
                </button>
              </li>
            </ul>
          </div>
          <div class="flex">
            <button type="button" class="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download</button>
            <button type="button" class="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Delete</button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</div>

  

  

  <!-- </div> -->

  <!-- ======================================== -->

<?php get_footer();