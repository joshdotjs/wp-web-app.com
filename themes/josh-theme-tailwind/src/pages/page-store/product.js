import React, { useState, useEffect, useRef } from 'react';
import { gsap } from "gsap";

import Button from './button';
import ProductDetailsModal from './product-details-modal';
import { StarFull, StarEmpty, StarHalfFull} from './Stars';

import { lc, lg, lo, lp, lb, lr, ly } from '../../util/log';
import { getLS, setLS } from '../../util/local-storage';
import { fireEvent } from '../../util/custom-event';
import { fetchGET } from '../../util/fetch';

// ==============================================

// Local Storage:
const getCartLS = () => getLS('cart');
const updateCartLS = (cart) => setLS('cart', cart);

// ==============================================

export default function Product({ product }) {

  const {id, title, permalink, price, categories, color, rating, num_ratings } = product;

  const [stars, setStars] = useState({ full: 0, half: 0, empty: 5 });
  // console.log('stars.empty: ', stars.empty);

  useEffect(() => {

    const num = Number(rating);

    const numStarsV1 = (x) => { // Works
      // expecting { 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5 }
      const floor = Math.floor(x);
      const ceil = Math.ceil(x); 
  
      const full = floor;
      const half =  floor == ceil ? 0 : 1;
      const empty = Math.max(5 - full - half, 0);

      return { full, half, empty };
    };
    const { full, half, empty } = numStarsV1(rating);
   
    // const numStarsV2 = (x) => {
    //   // Step 1: Is odd?  If odd then there will be a half star
    //   // Step 2: Divide by 2 and take the floor.
    //   // -NOTE: Quirck: Anything between two numbers always results in half star (e.g. 3->3, 3.1->3.5, 3.5->3.5, 3.6->3.5, 4->4)
    //   x = x * 2;
    //   let half;
    //   if (x % 2 === 0)  half = 0;
    //   else              half = 1;

    //   const full = Math.floor(x / 2);
    //   const empty = 5 - full - half;

    //   return { full, half, empty };
    // };
    // const { full, half, empty } = convertRatingOneToTenToStarsOneToFive(rating);
    // console.log('rating: ', rating, '  =>  \nfull:', full, '\nhalf: ', half, '\nempty: ', empty );


    setStars({
      full,
      half,
      empty,
    });

  }, []);

  // --------------------------------------------
  
  const addToCart = (product) => {

    console.log('product: ', product);

    const { ID } = product;
  

    let cart_ls = getCartLS();
    if (cart_ls === null){
      updateCartLS([]); // safegaurd in case the user somehow empties local storage after page load (this is set in the loading of the header)
      cart_ls = getCartLS();
    }

    const idx = cart_ls.findIndex(x => ID === x.ID);
  
    if (idx < 0) {
      lo('addToCart() - new line item');
      const new_cart = [...cart_ls, { ...product, qty: 1 }]; // clone local cart state and add a new product item to the array with the cloned cart.
      updateCartLS(new_cart);
    } else {
      ly('addToCart() - updating quantity');
      const new_cart = [...cart_ls]; // clone local cart state via deep copy (no nessesary since not using react state anymore)
      new_cart[idx] = {...cart_ls[idx], qty: cart_ls[idx].qty + 1}; // update specific item's quantity in the cloned cart array.
      updateCartLS(new_cart);
    }
  
    fireEvent('cart-add');
    // openCart();
  };
  
  // --------------------------------------------

  const modal_ref = useRef(null);

  const openModal = () => {
    lo('opening modal')
    const modal = modal_ref.current;
    modal.style.display = 'grid';
    gsap.to(modal, { 
      opacity: 1,
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      },
    });
  };
  const closeModal = () => {
    lg('closing modal');
    const modal = modal_ref.current;
    gsap.to(modal, { 
      opacity: 0, 
      duration: 0.3,
      onComplete: () => {
        modal.style.display = 'none';
        document.body.style.overflow = "overlay";
      },
    });
  };

  // --------------------------------------------
  
  return (
    <React.Fragment key={id}>
  
      <ProductDetailsModal {...{product, addToCart, closeModal, modal_ref}} />

      <div 
        className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white h-fit"
      >
        <div 
          // className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-96"
          // className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-96"
        >
          <img 
            src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg" 
            alt="Front of plain black t-shirt." 
            className="m-0 h-full w-full object-cover object-center sm:h-full sm:w-full" 
          />
        </div>

        <div className="flex flex-1 flex-col space-y-2 p-4">
          <h3 className="text-sm font-medium text-gray-900">
            
            <a href={permalink} target="_blank">
              {title}
            </a>
          </h3>
          <p className="text-sm text-gray-500">Look like a visionary CEO and wear the same black t-shirt every day.</p>
          <div className="grid grid-cols-2">
            <div className="flex flex-1 flex-col justify-end">
              <p className="text-sm italic text-gray-500">{ color }</p>
              <p className="text-base font-medium text-gray-900">${price}</p>

              <div class="absolute top-[10px]">{categories?.map(category => <p>{category}</p>)}</div>

              <div class="mt-3 flex flex-col ">
                {/* <p class="sr-only">5 out of 5 stars</p> */}
                <div class="flex items-center">

                  {[...new Array(stars.full)].map((_, jdx) => <React.Fragment key={`${id}-full-${jdx}`}>
                      <StarFull />
                    </React.Fragment>
                  )}

                  {[...new Array(stars.half)].map((_, jdx) => <React.Fragment key={`${id}-half-${jdx}`}>
                      <StarHalfFull />
                    </React.Fragment>
                  )}

                  {[...new Array(stars.empty)].map((_, jdx) => <React.Fragment key={`${id}-empty-${jdx}`}>
                      <StarEmpty />
                    </React.Fragment>
                  )}

                </div>
                <p class="mt-1 text-sm text-gray-500">{num_ratings} reviews</p>
              </div>


            </div>
            <div className="flex flex-1 flex-col justify-evenly" >
              <Button onClick={() => {
                openModal();
              }} size='md' color='primary' classNames='mb-0'>Details</Button>
              <Button onClick={() => {
                addToCart(product);
              }} size='md' color='secondary' classNames=''>Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  );
}
