import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

import Card from './card';
import Dropdown from './dropdown/dropdown';
import Pagination from './pagination';
import { openDrawer as openMobileFilters } from './filters/drawer';

// ==============================================

export default function Grid({
  refs,
  layout,
  addToCartAnim,
  show_filters, setShowFilters,
  filters_container_ref, grid_container_ref, container_ref,
  sort_type, applySort,
  page_num, updatePageNum,
  num_products
}) {

  // --------------------------------------------

  const filters_tl_ref = useRef(null);

  // --------------------------------------------

  const disableCardFLIP = () => {
    const boxes = grid_container_ref.current.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.classList.remove('box');
      box.classList.add('__box__');
    })
  };
  const enableCardFLIP = () => {
    const boxes = grid_container_ref.current.querySelectorAll('.__box__');
    boxes.forEach((box) => {
      box.classList.add('box');
      box.classList.remove('__box__');
    })
  };

  // --------------------------------------------

  const openFilters = () => {

    if (filters_tl_ref.current) 
     filters_tl_ref.current.revert();
     
    const tl = gsap.timeline();

    const container = container_ref.current;
    const grid_container = grid_container_ref.current;
    console.log('grid_container: ', grid_container);

    // Disable FLIP animation during the 'show filters' animation
    disableCardFLIP();

    const filters_container = filters_container_ref.current;

    const duration = 0.3;

      tl.to(filters_container, {
        opacity: 0,
        duration,
      });

      filters_tl_ref.current = tl.to(filters_container, { 
        x: '-100%', 
        width: 0,
        duration,
        onComplete:        () => enableCardFLIP(),
        onReverseComplete: () => enableCardFLIP(),
      },
      '<='
    );
  };

  // --------------------------------------------

  const closeFilters = () => {
    disableCardFLIP();
    filters_tl_ref.current?.reverse();
  }; 

  // --------------------------------------------

  const openFiltersHandler = () => {

    setShowFilters((prev) => {

      if (prev) {
        openFilters();
      } else {
        closeFilters();
      }

      return !prev;
    });

  }

  // --------------------------------------------

  // const [sort_type, setSortType] = useState({ title: '',  sub_title: '', type: '', }); // e.g. { title: 'Price',  sub_title: 'High-Low', type: 'DESC'  }

  // --------------------------------------------

  return (
    <>

      {/* - - - - - - - - - - - - - - - - - - */}

      {/* Mobile Button (different open/close handler): */}
      <div className="flex lg:hidden" id="filter-button-row">
        <div id="show-filters-button" onClick={() => {
            openMobileFilters();
        }} className="flex items-center">
          { show_filters && <h4>Hide Filters</h4> }
          { !show_filters && <h4>Show Filters</h4> }
          <svg aria-hidden="true" className="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="22px" height="22px" fill="none">
            <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
            <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
            <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
            <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
          </svg>
        </div>

        <Dropdown { ...{ sort_type, applySort } } />
      
      </div>

      {/* Desktop Button (different open/close handler): */}
      <div className="hidden lg:flex" id="filter-button-row">
        <div id="show-filters-button" onClick={() => {
          openFiltersHandler();
        }} className="flex items-center">
          { show_filters && <h4>Hide Filters</h4> }
          { !show_filters && <h4>Show Filters</h4> }
          <svg aria-hidden="true" className="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="22px" height="22px" fill="none">
            <path stroke="currentColor" strokeWidth="1.5" d="M21 8.25H10m-5.25 0H3"></path>
            <path stroke="currentColor" strokeWidth="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
            <path stroke="currentColor" strokeWidth="1.5" d="M3 15.75h10.75m5 0H21"></path>
            <path stroke="currentColor" strokeWidth="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clipRule="evenodd"></path>
          </svg>
        </div>

        <Dropdown { ...{ sort_type, applySort } } />
      
      </div>


      {/* - - - - - - - - - - - - - - - - - - */}

      <ul // items
        id="grid-items"
      >
        

        {layout.items.map((item, idx) => {
          
          const key = `box-${item.product.id}`;

          return (
            <li // item
            key={key}
            id={key} 
            data-flip-id={key}
            className="box"
            style={{ 
              display: item.status === 'exiting' ? 'none' : 'grid',
              // minWidth: '200px'
            }}
            >
              <div 
                ref={el => refs.current[idx] = el}
                className="box-child"
                >
                <Card { ...{ item, addToCartAnim, idx } } />
              </div>
            </li>);
        })}
      </ul>

      {/* - - - - - - - - - - - - - - - - - - */}

      <Pagination 
        {...{ page_num, updatePageNum, num_products }}
        // num_products={layout.items.length}
      />

      {/* - - - - - - - - - - - - - - - - - - */}

    </>
  );

  // --------------------------------------------

}

// ==============================================
