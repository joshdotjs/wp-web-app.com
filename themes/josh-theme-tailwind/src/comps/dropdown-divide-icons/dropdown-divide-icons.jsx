import { useState, useEffect, useRef } from 'react'; 
import { useClickOutside } from '@mantine/hooks';
import { gsap } from 'gsap';

import { transition } from '../../util/transition';

// ==============================================

export default function DropdownWithDividerWithIcons({
  data,
  // data={[ // assume sections are like {0, 1, 2} (starting at zero and contiguously numbered)
  //                                                             idx   jdx    index    
  // { value: 'Edit',             label: '',     section: 0},    0      0      0
  // { value: 'Duplicate',        label: '',     section: 0},    0      1      1
  // { value: 'Archive',          label: '',     section: 1},    1      0      2
  // { value: 'Move',             label: '',     section: 1},    1      1      3
  // { value: 'Share',            label: '',     section: 2},    2      0      4
  // { value: 'Modify',           label: '',     section: 2},    2      1      5
  // { value: 'Add to favorites', label: '',     section: 2},    2      2      6
  // { value: 'Delete',           label: '',     section: 3},    3      0      7
  // ]}

  // jdx:  0   1   2
  //
  // idx
  // ---  --- --- --- 
  //  0:   x   x 
  //  1:   x   x
  //  2:   x   x   x
  //  3:   x

  value,
  // value={dropdown}
  onChange,
  // onChange={setDropdown}
}) {

  const [open, setOpen] = useState(false);

  const refs = useRef([]);
  const arrow_ref = useRef(null);
  const menu_ref = useRef(null);


  // - - - - - - - - - - - - - - - - - - - - - 
  
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
      onComplete: () => menu.style.display = 'none',
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

  const [outer, setOuter] = useState([]);
  

  useEffect(() => {

    let outer = []; // local variable overrides the outer state.
    const M = data.length; // num rows in matrix
    let N = 0; // num cols in matrix (max num elements in all inner arrays)
    data.forEach((row) => {
      if (row.length > N)
        N = row.length;
    });
  
    
    let count = 0;
    for (let i = 0; i < M; ++i) {
      const row = data[i];
      const inner = row.map((elem) => { 
        const idx = count;
        count++;
        return (
          <button 
            ref={el => refs.current[idx] = el} 
            onClick={(e) => {
              e.stopPropagation();
              onChange(elem.value);
              closeDropdown();
            }}
            onMouseOver={mouseOverHandler(idx)}
            onMouseOut={mouseOutHandler(idx)}
            // class="w-full text-left text-gray-700       block             px-4 py-2 text-sm" // from dropdown-divide-icons.jsx
            class="   w-full           text-gray-700 group flex items-center px-4 py-2 text-sm" // from dropdown with icons TUI
            role="menuitem" tabindex="-1"
          >
            <svg // Heroicon name: mini/pencil-square
              class="h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              style={{ marginRight: '0.5rem' }}
            >
              {elem?.svg_paths}
            </svg>

            {elem.label}
          </button>
        );
      });
  
      outer[i] = 
        <div class={`py-1 ${i < M-1 ? 'border-b' : ''}`} role="none">
          {inner}
        </div>
      ;
  
    } // for
    setOuter(outer);
    // const windowClickHanlder = () => console.log('clicked outside!');
    // window.addEventListener('click', windowClickHanlder);
    // return window.removeEventListener('click', windowClickHanlder); 
  }, [data]);


  // --------------------------------------------

  // click outside to close:

  const [dropdown, setDropdown] = useState(null);
  const [menu, setMenu] = useState(null);
  useClickOutside(() => {
    open && (() => {
      console.log('%cclicked outside dropdown-divide-icons', 'color: deepskyblue');
      closeDropdown();
    })();
  }, null, [menu, dropdown]);


  // --------------------------------------------

  return (
      <div class="relative inline-block text-left">
        <div>
          <button
            ref={setDropdown} // click-outside
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }} 
            type="button" 
            class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true"
          >
            Options
            <svg  // Heroicon name: mini/chevron-down
              ref={arrow_ref}
              class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>


        <div
          ref={menu_ref} 
          class="
            absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
            hidden opacity-0
          " 
          style={{ transform: 'scale(0.75)' }}
          role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
        >
          <div 
            ref={setMenu} // click outside
          >
            <div class="py-1" role="none">
              {outer}
            </div>
          </div>
        </div>
      </div>
  );
}