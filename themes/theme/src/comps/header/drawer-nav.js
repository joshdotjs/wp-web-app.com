import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

import { setFiltersLS } from '../../util/local-storage';
import { transitionTextColor } from '../../util/transition';
import { lc, lg, lo, lp, lb, lr, ly } from '../../util/log';
import { fetchGET } from '../../util/fetch';

// ==============================================

const Item = ({ title, department, img, close }) => {
  return (
    <div class="group relative">
      <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
        <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." class="object-cover object-center" />
      </div>
      <a 
        // href="/store"
        href={`${PHP.site_url}/store`}

        onClick={() => {

          // console.log('title: ', title);

          setFiltersLS({ 
            department: department.toLowerCase(), 
            tag: null,
            category: title.toLowerCase(),
          });

          // close();
  
        }}

        class="mt-6 block text-sm font-medium text-gray-900"
      >
        <span class="absolute inset-0 z-10" aria-hidden="true"></span>
        { title }
      </a>
      <p aria-hidden="true" class="mt-1 text-sm text-gray-500">Shop now</p>
    </div>
  );
};

// ==============================================

const Panel = ({ refs, department, close, idx }) => {

  // --------------------------------------------

  return (
    <div // Tab panel, show/hide based on tab state.
      ref={el => refs.current[idx] = el}
      // id="tabs-1-panel-1" 
      class="space-y-12 px-4 py-6" 
      aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0"
      style={{
        position: 'absolute',
        // top: '0',
        width: '100%',
        opacity: 1,
        // zIndex: 1,
        height: 'fit-content'
      }}
    >
      <div class="grid grid-cols-2 gap-x-4 gap-y-10">

        <Item title='Shoes'  { ...{ department, close } } />
        <Item title='Shirts' { ...{ department, close } } />
        <Item title='Pants'  { ...{ department, close } } />
        <Item title='Hats'   { ...{ department, close } } />

      </div>
    </div>
  );
};

// ==============================================

export default function DrawerNav({ 
  site_urls, drawer_nav_open, closeDrawerNav, drawer_nav_overlay_ref, logged_in, user
}) {

  // --------------------------------------------

  const [active_panel, setActivePanel] = useState(0);

  const panel_refs = useRef([]);
  const panels_ref = useRef();
  const tabs_ref = useRef();

  // -Add height on the panel dynamically to simulate 
  //  document flow of absolutely postiioned panels:
  useEffect(() => {
    const panels = panel_refs.current; // absolute
    const panel = panels_ref.current;  // relative (container)
    const tabs = tabs_ref.current;     // tabs above panel

    const { height: height1 } = panels[0].getBoundingClientRect();
    const { height: height2 } = tabs.getBoundingClientRect();

    panel.style.minHeight = `${height1 + height2}px`;
  }, []);

  // --------------------------------------------

  const clickHandler = (idx) => {

    setActivePanel(idx);

    panel_refs.current.forEach((ref, i) => {
      if (i !== idx) {
        gsap.to(ref, { 
          opacity: 0, 
          onComplete: () => ref.style.display = 'none',
        });
      }
    });

    const ref = panel_refs.current[idx];
    gsap.to(ref, {
      opacity: 1,
      onStart: () => ref.style.display = 'block',
    });

  };

  // --------------------------------------------
  
  const portal_root = document.querySelector('#react-portal-navdrawer');
  
  // --------------------------------------------

  return createPortal( // portals preserve event delegation
    <div
      id="portal-navdrawer-container"
      class="relative" 
      style={{
        zIndex: -1
      }} 
      aria-labelledby="slide-over-title" 
      role="dialog" 
      aria-modal="true"

      onClick={() => {
        lg('click outside nav drawer => close drawer');
        closeDrawerNav();
      }} 
    >
          
      <div  // overlay
        ref={drawer_nav_overlay_ref}
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
        class="fixed overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        
        <div 
          class={
            `
              w-[325px]
              fixed left-0 flex  inset-y-0
              ${!drawer_nav_open ? '-translate-x-full' : 'translate-x-0'} ease-in-out duration-300
            `
          }
        >

        <div class={
          // relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl
          ` 
            bg-white w-full max-w-xs flex flex-col
             overflow-y-scroll
          `
          }
        >

          {/* =============================== */}

          <div // close drawer (X) button
            class="flex px-4 pt-5 pb-2">
            <button 
              onClick={() => {
                console.log('clicked the close nav drawer button');
                closeDrawerNav();
              }}
              type="button" 
              class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span class="sr-only">Close menu</span>
              {/* <!-- Heroicon name: outline/x-mark --> */}
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* =============================== */}

          {/* <!-- Panels --> */}
          <div 
            ref={panels_ref} 
            class="mt-2" 
            style={{ 
              position: 'relative', 
              // height is added dynamically
            }}
          >

            {/* --------------------------------------- */}
            
            <div // Tab buttons (Men / Women) 
              ref={tabs_ref}
              class="border-b border-gray-200">
              <div class="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
                                
                { [{ department: 'Men' }, { department: 'Women' }].map(({ department }, idx) => (
                  <button 
                    onClick={() => clickHandler(idx)}
                    class={
                      `
                        ${transitionTextColor(active_panel === idx, 'text-indigo-600 border-indigo-600', 'text-gray-900 border-transparent')}
                        border-transparent flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium
                      `
                    }
                    // style={
                    //   active_panel === idx ? {
                    //   textDecoration: 'underline',
                    //   textUnderlineOffset: '0.45rem'
                    // } : {}}
                    aria-controls="tabs-1-panel-1" role="tab" type="button"
                  >
                    { department }
                  </button>
                )) }

              </div>
            </div>

            {/* --------------------------------------- */}

            <Panel refs={panel_refs} idx={0} department="Men" close={closeDrawerNav} />

            {/* --------------------------------------- */}
            
            <Panel refs={panel_refs} idx={1} department="Women" close={closeDrawerNav} />

            {/* --------------------------------------- */}
          </div>

          {/* =============================== */}

          <div // Navlinks (About / Contact)
            class="space-y-6 border-t border-gray-200 py-6 px-4">
            <div class="flow-root">
              <a 
                // href={site_urls.about} 
                href={`${PHP.site_url}/about`}
                class="-m-2 block p-2 font-medium text-gray-900">About</a>
            </div>

            <div class="flow-root">
              <a 
                // href={site_urls.contact} 
                href={`${PHP.site_url}/contact`}
                class="-m-2 block p-2 font-medium text-gray-900">Contact</a>
            </div>
          </div>

          {/* =============================== */}

          <div  // Navlinks (Login / Register)
            class="space-y-6 border-t border-gray-200 py-6 px-4">



              { logged_in && 
                  <>
                    <div class="flow-root">              

                      {/* { user.admin === false && <a href={site_urls.orders} class="-m-2 block p-2 font-medium text-gray-900">{user?.username}</a> } */}
                      {/* { user.admin === true  && <a href='/admin-dashboard' class="-m-2 block p-2 font-medium text-gray-900">{user?.username}</a> } */}
                      { user.admin === false && <a href={`${PHP.site_url}/orders`} class="-m-2 block p-2 font-medium text-gray-900">{user?.username}</a> }
                      { user.admin === true  && <a href={`${PHP.site_URL}/admin-dashboard`} class="-m-2 block p-2 font-medium text-gray-900">{user?.username}</a> }

                    </div>
                    <div class="flow-root">
                      <button
                        // onClick={() => closeDrawerNav()} 
                        onClick={async () => {
                          // console.log('signing out...');
                          // const data = await fetchGET('http://jadefse.local/wp-json/josh/v1/signout');
                          const data = await fetchGET(`${PHP.rest_url}/signout`);
                          // console.log('resonse: ', data);
                          // window.location.pathname = '/';
                          window.location.pathname = `${PHP.site_url}/`;
                        }}
                        class="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                }
                { !logged_in && 
                <>
                  <div class="flow-root">              
                    <a 
                      // href="/auth-register" 
                      href={`${PHP.site_url}/auth-register`}
                      // onClick={() => closeDrawerNav()} 
                      class="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create an account
                    </a>
                  </div>
                  <div class="flow-root">
                    <a 
                      // href="/auth-login" 
                      href={`${PHP.site_url}/auth-login`} 
                      onClick={() => closeDrawerNav()} 
                      class="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                </>
              }

          </div>

          {/* =============================== */}
        
        </div>
        </div>
      </div>
    </div>,
    portal_root
  )
}
