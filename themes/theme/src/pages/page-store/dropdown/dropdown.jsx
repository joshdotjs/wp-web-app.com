import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { disableClick, enableClick } from '../../../util/dom';

import ChevronDownSVG from '@/comps/svg/chevron-down';

// ==============================================

const sort_options_arr = [
  { title: 'Price',  sub_title: 'High-Low', direction: 'DESC'  },
  { title: 'Price',  sub_title: 'Low-High', direction: 'ASC' },
  { title: 'Name',   sub_title: 'A-Z',      direction: 'ASC'  },
  { title: 'Name',   sub_title: 'Z-A',      direction: 'DESC' },
];

// ==============================================

export default function Dropdown({
  // updateProducts, 
  sort_type,
  applySort
}) {

  // --------------------------------------------

  const chooseSort = ({ title, sub_title, direction }, idx) => {
    //
    // sort_obj:  { title: string, sub_title: string, direction: string }
    //

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

    // update sort state and update layout.items state which triggers FLIP animation in useLayoutEffect(): 
    applySort({ title, sub_title, direction });

    // updateProducts({ sort_type });
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
    if (show_sort_dropdown) {
      hideSortDropdown();
      removeEventListener('click', hideSortDropdown, { once: true });
    } else {
      showSortDropdown();
      addEventListener('click', hideSortDropdown, { once: true });
    }
  };

  // --------------------------------------------

  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleSortDropdown();
          }}
          type="button" 
          className="group inline-flex justify-center items-center" 
          // text-sm font-medium 
          // text-gray-700 hover:text-gray-900
          // id="menu-button" 
          aria-expanded="false" 
          aria-haspopup="true"
        >

          <h4 className="mr-2">Sort By{sort_type?.sub_title && ': '}</h4>
          
          { sort_type?.title && <h4 className="light  mr-2 sm:mr-0">{sort_type?.title}</h4> }
          { sort_type?.sub_title && (

            <>
              <h4 className="light ml-[0.32rem] mr-2  hidden sm:inline">{sort_type?.sub_title}</h4>

              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up  inline sm:hidden" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
              </svg> */}

              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-do  inline sm:hidden" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
              </svg> */}
            </>
          )}


          <ChevronDownSVG />

        </button>
      </div>

      <div // Sort dropdown menu 
        ref={ref}
        className={`
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
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1"
      >
        <div 
          className="py-1" role="none" onClick={e => e.stopPropagation()}
        >
          { sort_options_arr.map(({ title, sub_title, direction }, idx) => (
            <button 
              key={`${title}-${idx}`}
              onClick={() => chooseSort({ title, sub_title, direction }, idx)}
              style={{ width: '200px' }}
              className="text-left font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0"
            >
                  
              <svg //  Heroicon name: mini/check
                ref={el => check_refs.current[idx] = el}
                style={{ opacity: 0 }}
                className="inline text-indigo-600 texth-5 w-5 mr-2" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>

              <strong>
                {title}{sub_title && ': '}
              </strong>

              {sub_title}

            </button>
          ))}
        </div>
      </div>
    </div>
  );

}