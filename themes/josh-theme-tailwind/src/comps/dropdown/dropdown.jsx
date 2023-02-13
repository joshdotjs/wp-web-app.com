import { useState, useEffect, useRef } from 'react'; 
import { useClickOutside } from '@mantine/hooks';
import { gsap } from 'gsap';

import { transition } from '../../util/transition';

// ==============================================

export default function Dropdown({
  data,
  // data={[
  //   { value: 'react', label: 'React' },
  //   { value: 'ng', label: 'Angular' },
  //   { value: 'svelte', label: 'Svelte' },
  //   { value: 'vue', label: 'Vue' },
  // ]}
  value,
  // value={dropdown}
  onChange,
  // onChange={setDropdown}
}) {

  // --------------------------------------------

  const [open, setOpen] = useState(false);

  const refs = useRef([]);
  const arrow_ref = useRef(null);
  const menu_ref = useRef(null);

  const [dropdown, setDropdown] = useState(null);
  const [menu, setMenu] = useState(null);
  useClickOutside(() => {
    open && (() => {
      console.log('%cclicked outside dropdown', 'color: cyan');
      closeDropdown();
    })();
  }, null, [menu, dropdown]);


  // - - - - - - - - - - - - - - - - - - - - - 
  
  const flashFeedbackAndClose = (idx) => {

    console.log('%c flashFeedbackAndClose() ', 'color: darkorange');

    const elem = refs.current[idx];
    const menu = menu_ref.current;

    const tl = gsap.timeline({ repeat: 5 });

    // tl.fromTo(elem, {
    //   background: 'white'
    // }, {
    //   background: '#F3F4F5',
    //   duration: 0.1,
    // });

    const duration = 0.1;

    // -Don't use this here:
    const freezeAllClicks = () => {
      let freezeClic = false; // just modify that variable to disable all clics events
      document.addEventListener("click", freezeClicFn, true);
      function freezeClicFn(e) {
        if (freezeClic) {
          e.stopPropagation();
          e.preventDefault();
        }
      }
      function disableClicksFor5s() {
        freezeClic = true;
        setTimeout(() => {
          freezeClic = false;
        }, 4 * duration * 1e3);
      }
      disableClicksFor5s();
    };

    tl.to(elem, {
      background: '#F3F4F5',
      duration,
    });

    tl.to(elem, {
      background: 'white',
      duration,
      // onComplete: () => closeDropdown(),
    });


    tl.to(elem, {
      background: '#F3F4F5',
      duration,
    });

    tl.to(elem, {
      background: 'white',
      duration,
      onComplete: () => {
        closeDropdown();
        tl.kill();
    }});

  
  };
  
  // - - - - - - - - - - - - - - - - - - - - 
  
  const openDropdown = () => {
    
    const menu = menu_ref.current;
    const arrow = arrow_ref.current;
    const duration = 0.2;
    
    menu.style.display = 'block';

    gsap.fromTo(menu, {
      opacity: 0,
      scale: 0.75,
    },{
      opacity: 1,
      scale: 1,
      duration,
    });

    gsap.to(arrow, {
      rotate: '180deg',
      duration,
    });
    
    setOpen(true);
  }
        
  // - - - - - - - - - - - - - - - - - - - - - 
  
  const closeDropdown = () => {
    
    const menu = menu_ref.current;
    const arrow = arrow_ref.current;
    const duration = 0.2;
    
    gsap.fromTo(menu, {
      opacity: 1,
      scale: 1,
    }, {
      opacity: 0,
      scale: 0.75,
      onComplete: () => {
        menu.style.display = 'none';
        refs.current.forEach((item) => item.style.background = 'white'); // ensure all items are reset
      },
      duration,
    });

    gsap.to(arrow, {
      rotate: '0deg',
      duration,
    });
    
    setOpen(false);
  }
  // - - - - - - - - - - - - - - - - - - - - - 
  
  const toggleDropdown = () => {
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // --------------------------------------------

  const mouseOverHandler = (idx) => () => {
    const elem = refs.current[idx];
    gsap.fromTo(elem, {
      background: 'white'
    }, {
      background: '#F3F4F5',
      duration: 0.1,
    });
  };


  const mouseOutHandler = (idx) => () => {
    const elem = refs.current[idx];
    gsap.to(elem, {
      background: 'white',
      duration: 0.1,
    });
  };


  // --------------------------------------------

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          ref={setDropdown}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
          type="button" 
          class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true"
        >
          Options
          {/* <!-- Heroicon name: mini/chevron-down --> */}
          <svg // arrow 
            ref={arrow_ref}
            class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
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
      <div 
        ref={menu_ref}
        class={`
          absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
          hidden opacity-0
        `}
        style={{ transform: 'scale(0.75)' }}
        // ${transition(open, 'opacity-100 scale-100','transform opacity-50 scale-95', `ease-in-out duration-${duration_tailwind}`) }
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
      >
        <div 
          ref={setMenu}
          class="py-1" role="none"
        >
          {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}

          {/* - - - - - - - - - - - - - - - - - - - -  */}

          {data.map((datum, idx) => {
            return (
              <button 
                ref={el => refs.current[idx] = el} 
                onClick={() => {
                  onChange(datum.value);
                  flashFeedbackAndClose(idx);
                }}
                onMouseOver={mouseOverHandler(idx)}
                onMouseOut={mouseOutHandler(idx)}
                class='text-gray-700 block px-4 py-2 text-sm w-full text-left'
                role="menuitem" 
                tabindex="-1" 
              >
                {datum.label}    
              </button>
            );   
          })}
          
          {/* - - - - - - - - - - - - - - - - - - - -  */}
          
        </div>
      </div>
    </div>

  );
}