import { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';

import ButtonCart from "./button-cart";
import ButtonDrawer from "./button-drawer";

import { ly, lc, lo, lg, lp } from "../../util/log";
import { setFiltersLS } from '../../util/local-storage';
import { fireEvent } from "../../util/custom-event";
import { disableClick, enableClick } from '../../util/dom';

import logo from '../../img/logo.svg';

// ==============================================

const INITIAL_STATE = { show: false, idx: null };

// ==============================================

const Item = ({title, category, img, idx, closeFlyout}) => (
  <div class="group relative">
    <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
      <img src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg" alt="Models sitting back to back, wearing Basic Tee in black and bone." class="object-cover object-center" />
    </div>
    <a
      // href="/store"
      href={`${PHP.site_url}/store`}
      onClick={(e) => {

        setFiltersLS({ 
          department: title.toLowerCase(), 
          tag: null,
          category: category.toLowerCase(),
        });
        closeFlyout(idx);


        // -Trying to emulate SPA behavior with non-SPA routing - don't do this.
        // -Just refresh page -- when rebuilding this with complete SPA we can avoid the page refresh.
        // const pathname = window.location.pathname;
        // if (pathname.includes('store')) {
        //   e.preventDefault();   // -don't refresh page if already on /store
        //   fireEvent('navlink'); // -syncrhonize inter-app state
        // }

      }}
      class="mt-4 block font-medium text-gray-900"
    >
      <span class="absolute inset-0 z-10" aria-hidden="true"></span>
      {category}
    </a>
    <p aria-hidden="true" class="mt-1">Shop now</p>
  </div>
);

// ==============================================

const NavlinkFlyout = ({ title, idx, toggleMenu, closeFlyout, setFlyoutState, flyout_refs, flyout_overlay_refs, screen }) => {

  // --------------------------------------------

  // lg('title: ', title)

  const [navbar_bottom_height, setNavbarBottomHeight] = useState(0);
  useEffect(() => {
    const navbar_bottom = document.querySelector('#navbar-bottom');
    const navbar_bottom_height = navbar_bottom.offsetHeight;
    setNavbarBottomHeight(navbar_bottom_height);
  },[]);
  
  // --------------------------------------------



  // --------------------------------------------

  return (
    <li // flyout item 1 - Men
      class={`
        mr-8  
        hidden 
        sm:inline-block
      `}
    >
      <button // flyout menu button (1)
        onClick={(e) => {
          lc('clicked navlink 0');
          toggleMenu(idx);
          // e.stopPropagation(); // don't bubble event up in order to not click the top-level element in this element that closes the menu.
        }}
      >
        {title}
      </button>


      <div  // overlay
        ref={(ref) => flyout_overlay_refs.current[idx] = ref}
        onClick={() => {
          closeFlyout(idx);
          setFlyoutState(INITIAL_STATE);
        }}
        class="
          fixed
          pointer-events-auto
        "
        // backdrop-blur-lg
        style={{ 
          display: 'none', 
          opacity: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          height: '100vh',
          width: '100vw',
          top: `${navbar_bottom_height-1}px`,
          left: '-1px',
          // zIndex: -1
          backdropFilter: 'blur(15px)', // Hey - I think this is not animating the blur!  I think a single blur is computed and then the opacity on it is animated - which is efficient.  I think animating a blur causes a diffrent blur to be computed for each frame of the animation with each one slightly more blurred than the previous.
          // TODO: Figure out why the backdrop filter does not work here!
          // TODO: Figure out why the backdrop filter does not work here!
          // TODO: Figure out why the backdrop filter does not work here!
          // TODO: Figure out why the backdrop filter does not work here!
        }}
      >  
      </div>


      <div // Flout Menu (1 - New and Featured) 
        ref={(ref) => flyout_refs.current[idx] = ref}
        class={`
          absolute 
          inset-x-0 
          top-full 
          text-sm 
          text-gray-500
          origin-top

          scale-95
          opacity-0 
      `}>
        <div // flyout-inner
          class="
            flyout-inner 
            relative bg-white
          "
          style={{ display: 'none'}} 
        >

          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-4 gap-y-10 gap-x-8 py-16">

              {/* - - - - - - - - - - - - - - - - - - - - - */}

              <Item  category="Shoes" img="..."  { ...{title, idx, closeFlyout} } />

              {/* - - - - - - - - - - - - - - - - - - - - - */}

              {/* { item('Shirts', '...') } */}
              <Item  category="Shirts" img="..."  { ...{title, idx, closeFlyout} } />

              {/* - - - - - - - - - - - - - - - - - - - - - */}

              {/* { item('Pants', '...') } */}
              <Item  category="Pants" img="..."  { ...{title, idx, closeFlyout} } />

              {/* - - - - - - - - - - - - - - - - - - - - - */}

              {/* { item('Hats', '...') } */}
              <Item  category="Hats" img="..."  { ...{title, idx, closeFlyout} } />

              {/* - - - - - - - - - - - - - - - - - - - - - */}
            </div>
          </div>

        </div>
      </div>
    </li>
  );

};

// ==============================================

const NavlinkNoFlyout = ({ title, tag, screen }) => {

  let responsive;
  if (screen === '2xl') responsive = '2xl:inline-block';
  if (screen === 'xl')  responsive = 'xl:inline-block';
  if (screen === 'lg')  responsive = 'lg:inline-block';
  if (screen === 'md')  responsive = 'md:inline-block';
  if (screen === 'sm')  responsive = 'sm:inline-block';
  if (screen === 'xs')  responsive = 'xs:inline-block';
  

  return (
    <li // navlink without flyout menu
      class={`
        mr-8  
        hidden
        ${responsive}
        cursor-pointer
      `}>
      <a 
        // href="/store"
        href={`${PHP.site_url}/store`}
        onClick={() => {

          setFiltersLS({ 
            department: null, 
            tag,
            category: null,
          });

        }}
      >
        {title}
      </a>
    </li>
  );
}

// ==============================================

export default function NavbarBottom({ site_urls, rest_urls, active_page, openDrawerCart, openDrawerNav, num_cart_items }) {

  // --------------------------------------------

  // const isActive = (page) => active_page == page ? 'bg-yellow-500' : '';

  // --------------------------------------------

  const [navbar_bottom_height, setNavbarBottomHeight] = useState(0);
  useEffect(() => {
    const navbar_bottom = document.querySelector('#navbar-bottom');
    const navbar_bottom_height = navbar_bottom.offsetHeight;
    setNavbarBottomHeight(navbar_bottom_height);
  },[]);
  
  // --------------------------------------------
  
  const flyout_refs = useRef([]);
  const flyout_overlay_refs = useRef([]);
  
  // --------------------------------------------

  const [ flyout_state, setFlyoutState ] = useState(INITIAL_STATE); // this state is used in the callback of the prev value passed into setFlyoutState() upon click of a flyout menu item button
  // const openMenu   = (idx) => { setFlyoutState({ show: true,    idx }); }
  const resetFlyoutState = () => setFlyoutState(INITIAL_STATE);
  
  // --------------------------------------------

  const closeFlyout = (idx) => {
    
    const flyout = flyout_refs.current[idx];
    const inner = flyout.querySelector('.flyout-inner');
    const overlay = flyout_overlay_refs.current[idx];
    
    const duration = 0.3;
    gsap.to(flyout, {
      opacity: 0,
      scale: 0.95,
      duration,
      onStart: () => disableClick(),
      onComplete: () =>{
        inner.style.display = 'none';
        document.body.style.overflow = "overlay"; // custom scrollbar overlay
        // resetFlyoutState();
      },
    });

    gsap.to(overlay, {
      opacity: 0,
      duration,
      onComplete: () => {
        overlay.style.display = 'none';
        enableClick();
      },
    });

    resetFlyoutState();

  };

  // --------------------------------------------
  
  const openFlyout = (idx) => {

    const flyout = flyout_refs.current[idx];
    const inner = flyout.querySelector('.flyout-inner');
    const overlay = flyout_overlay_refs.current[idx];

    disableClick();
    
    const duration = 0.3;
    gsap.to(flyout, {
      opacity: 1,
      scale: 1,
      duration,
      onStart: () => {
        disableClick();
        inner.style.display = 'block';
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the flyout
      },
    });

    gsap.to(overlay, {
      opacity: 1,
      duration,
      onStart: () => overlay.style.display = 'block',
      onComplete: () => enableClick(),
    });
  };

  // --------------------------------------------

  const toggleMenu = (idx) => {

    // - - - - - - - - - - - - - - - - - - - - - 

    setFlyoutState((prev) => {
     
      // User clicked a flyout navlink.
      // -3 cases:
      //  --1. [start closed] user clicks a navlink
      //    ---prev = { show: false, idx: null }
      //    ---curr = { show: true,  idx: idx }
      //      ----open clicked flyout
      //  --2. [start opened] user clicks same navlink again
      //    ---prev = { show: true, idx: idx} // new idx is same as old idx
      //    ---curr = { show: false, idx: null } // reset state
      //      ----close currently opened flyout
      //  --3. [start opened] user clicks different navlink
      //      ----close currently opened flyout
      //      ----open new flyout


      if (prev.show === false) { // case 1
        lp('case 1');
        openFlyout(idx);
        setFlyoutState({ show: true, idx });
      }
      else if (prev.show === true && prev.idx === idx) { // case 2
        ly('case 2')
        closeFlyout(idx);
        setFlyoutState(INITIAL_STATE);
      }
      else if (prev.show === true && prev.idx !== idx) { // case 3:
        lo('case 3')
        closeFlyout(prev.idx);
        openFlyout(idx);
        setFlyoutState({ show: true, idx });
      }

    }); // showMenu() invocation

    // - - - - - - - - - - - - - - - - - - - - - 

  }; // toggleMenu() function expression defintiion

  // --------------------------------------------

  return (
    <div // navbar-bottom
      id="navbar-bottom"
      class="flex justify-between py-6 relative z-0
        px-[40px]  sm:px-[50px]  md:px-[60px]  lg:px-[80px]  xl:px-[100px]"
      style={{ 
        
        // backdropFilter: 'blur(10px)', background: 'rgba(0, 0, 0, 0.5)', 
        backdropFilter: 'blur(10px) saturate(180%)',
        '-webkit-backdrop-filter': 'blur(10px) saturate(180%)',
        backgroundColor: 'rgba(17, 25, 40, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        color: 'white',
        marginTop: '-1px', position: 'relative', zIndex: '-1' // offset upwards a little to hide the edge effect (it is very evident between the top and bottom), cover with the top navbar
    }}
    >


      <a 
        // href='/'
        href={`${PHP.site_url}/`}
      >
        <img class="h-8 w-auto" src={logo} alt="Logo" />
      </a>


      <ul // flyout menu-items (nav-links)
        id="navbar-flyout-menu"
        class="hidden  sm:flex  items-center"
        // onClick={(e) => {
        //   e.stopPropagation(); // clicking anywhere besides the menu will close the opened menu
        // }}
      >

        {/* -------------------------------------------------- */}

        <NavlinkFlyout title="Men" idx={0} { ...{ toggleMenu, closeFlyout, setFlyoutState, flyout_refs, flyout_overlay_refs } } />

        {/* -------------------------------------------------- */}

        <NavlinkFlyout title="Women" idx={1} { ...{ toggleMenu, closeFlyout, setFlyoutState, flyout_refs, flyout_overlay_refs } } />

        {/* -------------------------------------------------- */}

        <NavlinkFlyout title="Kids" idx={2} screen="md" { ...{ toggleMenu, closeFlyout, setFlyoutState, flyout_refs, flyout_overlay_refs } } />

        {/* -------------------------------------------------- */}

        <NavlinkNoFlyout title="On Sale" tag="sale" screen="lg" />

        {/* -------------------------------------------------- */}

        <NavlinkNoFlyout title="New Arrivals" tag="new" screen="xl" />

        {/* -------------------------------------------------- */}

        <NavlinkNoFlyout title="Featured Items" tag="featured" screen="2xl" />

        {/* -------------------------------------------------- */}

      </ul>
      {/* ^^^^^^^^ flyout menu-items ^^^^^^^^ */}


      <div // buttons container
        class="flex  justify-between  w-[90px]  md:w-fit"
      >

        <ButtonCart { ...{ openDrawerCart, num_cart_items } } />
      
        <ButtonDrawer { ...{ openDrawerNav } } />

      </div>
      
    </div>
  );
}