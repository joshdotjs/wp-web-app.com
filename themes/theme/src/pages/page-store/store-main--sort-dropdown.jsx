import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { disableClick, enableClick } from '../../util/dom';

// ==============================================



const sort_options_arr = [
  { title: 'Price',  sub_title: 'High to low', col: 'price',  type: 'DESC'  },
  { title: 'Price',  sub_title: 'Low to high', col: 'price',  type: 'ASC' },
  { title: 'Name',   sub_title: 'A to Z',      col: 'title',  type: 'ASC'  },
  { title: 'Name',   sub_title: 'Z to A',      col: 'title',  type: 'DESC' },
  { title: 'Rating', sub_title: '',            col: 'rating', type: 'DESC'  },
];

// ==============================================

export default function SortDropdownSelect({
  updateProducts, setSort
}) {

  // --------------------------------------------

  const chooseSort = (sort_type, idx) => {

    
    disableClick(); // chooseSort() is run along with hideSortDropdown() => enableClick() run on completion of animation

    const duration = 0.1;

    // -hide all checks:
    const refs = check_refs.current;
    refs.forEach((ref) => {
      gsap.to(ref, { opacity: 0, duration });
    });

    const ref = check_refs.current[idx];
    const tl = gsap.timeline();

    // -flash / show the active check:
    tl.to(ref, { opacity: 1, duration, })
      .to(ref, { opacity: 0, duration, })
      .to(ref, { opacity: 1, duration, })
      .to(ref, { opacity: 0, duration, });

    tl.to(ref, {
      opacity: 1,
      duration,
      onComplete: () => {
        toggleSortDropdown();
      },
    });

    // update sort state: 
    setSort(sort_type);

    updateProducts({ sort_type });
  };

  // --------------------------------------------

  const ref = useRef(null);
  const check_refs = useRef([]);

  // --------------------------------------------

  const [ show_sort_dropdown, setShowSortDropdown ] = useState(false);

  // --------------------------------------------

  const showSortDropdown   = () => {

    console.log('opening');

    const elem = ref.current;

    let duration = 0.3;
    gsap.to(elem, {
      opacity: 1,
      scale: 1,
      duration,
      onStart: () => {
        elem.style.display = 'block';
        disableClick();
      },
      onComplete: () => enableClick(),
    });

    setShowSortDropdown(true);  
  }

  // --------------------------------------------

  const hideSortDropdown   = () => { 

    console.log('closing');

    const elem = ref.current;

    let duration = 0.3;
    gsap.to(elem, { 
      opacity: 0,
      scale: 0.8, 
      duration,
      onComplete: () => {
        elem.style.display = 'none';
        enableClick();
      },
    });

    setShowSortDropdown(false); 
  }

  // --------------------------------------------

  const toggleSortDropdown = () => { 
    setShowSortDropdown(prev => {
  
      const curr = !prev;

      // ${show_sort_dropdown ? 'translate-x-0 opacity-100 scale-100 z-10' : 'translate-x-0 transform opacity-0 scale-95'} ease-in-out duration-300

      if (curr === true) {
        showSortDropdown();
        addEventListener('click', hideSortDropdown, { once: true });
      } else {
        hideSortDropdown();
        removeEventListener('click', hideSortDropdown, { once: true });
      }
    }); 
  };

  // --------------------------------------------

  return (
    <div class="relative inline-block text-left">
      <div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleSortDropdown();
          }}
          type="button" 
          class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" 
          // id="menu-button" 
          aria-expanded="false" 
          aria-haspopup="true"
        >
          Sort
          {/* <!-- Heroicon name: mini/chevron-down --> */}
          <svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div // Sort dropdown menu 
        ref={ref}
        class={`
          absolute   right-0 
          mt-2 
          origin-top-right 
          rounded-md 
          bg-white 
          shadow-2xl 
          ring-1 
          ring-black 
          ring-opacity-5 
          focus:outline-none
          z-10
          opacity-0
          hidden
        `}
        style={{ transform: 'scale(0.8)' }}
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
      >
        <div 
          class="py-1" role="none" onClick={e => e.stopPropagation()}
        >
            {/* <!--
              Active: "bg-gray-100", Not Active: ""

              Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
            --> */}


            { sort_options_arr.map(({ title, sub_title, type, col }, idx) => (
              <button 
                onClick={() => chooseSort({ type, col }, idx)}
                style={{ width: '200px' }}
                class="text-left font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                  
                  <svg //  Heroicon name: mini/check
                    ref={el => check_refs.current[idx] = el}
                    style={{ opacity: 0 }}
                    class="inline text-indigo-600 texth-5 w-5 mr-2" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>

                  <strong>
                    {title}{sub_title && ': '}
                  </strong>
                    {sub_title}
              </button>
            )) }



        </div>
      </div>
    
    </div>
  );

}