import React, { Fragment } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

// ==============================================

const Link = ({ page_num, updatePageNum, children }) => {

  // --------------------------------------------

  const active_styles = 'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 cursor-pointer';
  const inactive_styles   = 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer';

  // --------------------------------------------

  return (
    <a
      // href="#"
      onClick={() => updatePageNum(Number(children)  - 1)}
      aria-current="page"
      className={page_num === Number(children) - 1 ? active_styles : inactive_styles}
    >
      {children}
    </a>    
  );

  // --------------------------------------------

};

// ==============================================

export default function Pagination({ num_products, page_num, updatePageNum }) {

  // --------------------------------------------

  const products_per_page = 6;
  const num_pages = Math.ceil(num_products / products_per_page); // 1-based, page_num is 0-based

  // --------------------------------------------

  let arr = [];

  // Case 1: Less than 7 pages    display: 1,2,3,4,5,6

  // Case 2:   num_pages: 7        pagination             page_num 
  //                               1,2,3,4,    ...,7      1,2,3         case-A
  //                               1,...,3,4,5,...,7      4             case-B
  //                               1,...,    4,5,6,7      5,6,7         case-C

  // Case 2:   num_pages: 8        pagination             page_num 
  //                               1,2,3,4,    ...,8      1,2,3         case-A
  //                               1,...,3,4,5,...,8      4             case-B
  //                               1,...,4,5,6,...,8      5
  //                               1,...,    5,6,7,8      6,7,8         case-C

  // Case 2:   num_pages: 9        pagination             page_num
  //                               1,2,3,4,    ...,9      1,2,3         case-A                   page_num === 1 | 2 | 3
  //                               1,...,3,4,5,...,9      4             case-B                   3 < page_num < num_pages-2=7
  //                               1,...,4,5,6,...,9      5
  //                               1,...,5,6,7,...,9      6
  //                               1,...,    6,7,8,9      7,8,9         case-C                   page_num === num_pages-2=7 | num_pages-1=8 | num_pages=9

  if (num_pages < 7) { // case 1 (num_pages < 7)
    for (let i = 0; i < num_pages; ++i) {
      arr.push(<Fragment key={`pagination-link-${i + 1}`}><Link {...{page_num, updatePageNum}}>{i + 1}</Link></Fragment>);
    }
  } else { // case 2 (num_pages >= 7)

    if (page_num < 3) { // case-A
      arr.push(<Fragment key={`pagination-link-${0}`}><Link {...{page_num, updatePageNum}}>{0 + 1}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${1}`}><Link {...{page_num, updatePageNum}}>{1 + 1}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${2}`}><Link {...{page_num, updatePageNum}}>{2 + 1}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${3}`}><Link {...{page_num, updatePageNum}}>{3 + 1}</Link></Fragment>);       
      arr.push(
        <Fragment key={`pagination-link-${4}`}>
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
        </Fragment>
      );
      arr.push(<Fragment key={`pagination-link-${5}`}><Link {...{page_num, updatePageNum}}>{num_pages}</Link></Fragment>);

    } else if (page_num < num_pages - 3) { // case-B

      arr.push(<Fragment key={`pagination-link-${0}`}><Link {...{page_num, updatePageNum}}>{0 + 1}</Link></Fragment>);
      arr.push(
        <Fragment key={`pagination-link-${1}`}>
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
        </Fragment>
      );
      arr.push(<Fragment key={`pagination-link-${2}`}><Link {...{page_num, updatePageNum}}>{(page_num-1) + 1}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${3}`}><Link {...{page_num, updatePageNum}}>{(page_num)   + 1}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${4}`}><Link {...{page_num, updatePageNum}}>{(page_num+1) + 1}</Link></Fragment>);
      arr.push(
        <Fragment key={`pagination-link-${5}`}>
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
        </Fragment>
      );
      arr.push(<Fragment key={`pagination-link-${6}`}><Link {...{page_num, updatePageNum}}>{num_pages}</Link></Fragment>);

    } else { // case-C
      arr.push(<Fragment key={`pagination-link-${0}`}><Link {...{page_num, updatePageNum}}>{0 + 1}</Link></Fragment>);
      arr.push(
        <Fragment key={`pagination-link-${1}`}>
          <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
            ...
          </span>
        </Fragment>
      );
      arr.push(<Fragment key={`pagination-link-${2}`}><Link {...{page_num, updatePageNum}}>{num_pages - 3}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${3}`}><Link {...{page_num, updatePageNum}}>{num_pages - 2}</Link></Fragment>);
      arr.push(<Fragment key={`pagination-link-${4}`}><Link {...{page_num, updatePageNum}}>{num_pages - 1}</Link></Fragment>);       
      arr.push(<Fragment key={`pagination-link-${5}`}><Link {...{page_num, updatePageNum}}>{num_pages    }</Link></Fragment>);
    }
  }


  // --------------------------------------------

  return (
    <div 
      id="pagination"
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          // href="#"
          onClick={() => page_num > 0 && updatePageNum(page_num - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          style={page_num === 0 ? { opacity: 0.5, pointerEvents: 'none' } : {}}
        >
          Previous
        </a>

        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            <span className="font-medium">{1 + (page_num * products_per_page)}</span> — <span className="font-medium">{Math.min(products_per_page + (page_num * 6), num_products)}</span> of{' '}
            <span className="font-medium">{num_products}</span> results
          </p>
        </div>

        <a
          // href="#"
          onClick={() => page_num < num_pages && updatePageNum(page_num + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          style={page_num === num_pages-1 ? { opacity: 0.5, pointerEvents: 'none' } : {}}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{1 + (page_num * products_per_page)}</span> to <span className="font-medium">{Math.min(products_per_page + (page_num * 6), num_products)}</span> of{' '}
            <span className="font-medium">{num_products}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              // href="#"
              onClick={() => page_num > 0 && updatePageNum(page_num - 1)}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
              style={page_num === 0 ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

           
            {arr}


            <a
              // href="#"
              onClick={() => page_num < num_pages && updatePageNum(page_num + 1)}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 cursor-pointer"
              style={page_num === num_pages-1 ? { opacity: 0.5, pointerEvents: 'none' } : {}}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}