import React, { useState, useEffect, useRef } from 'react';
import ReactDom, { createPortal } from 'react-dom';
import { gsap } from 'gsap';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../util/log';
// import { fetchPOST } from "../../util/fetch";
const fetchPOST = async (url, body) => {
  const res = await fetch(
    url, {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
};

// ==============================================

const Stars = ({ closeModal }) => {

  // --------------------------------------------
  
  // [Custom Endpoint] Register new user:
  const submitAuthForm = (type) => async () => {

    let endpoint = '';
    if (type === 'register') { endpoint = props.auth_rest.signup; }
    if (type === 'login') { endpoint = props.auth_rest.signin; }

    lo('submit Auth form');
    
    const res = await fetch(
      endpoint, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(auth_form)
    });
    const res_json = await res.json();
    if (res_json.status === 2) {
      lg('response: ' + JSON.stringify(res_json) );
      alert(`Successful ${type}`)
    }
    else {
      lr('response: ' + JSON.stringify(res_json) );
      alert('ERROR: Auth problem - see console.')
    }
  };

  // --------------------------------------------
  
  // [Custom Endpoint] Register new user:
  const submitRating = async () => {

    lo('submit Rating');


    const form_data = {
      "postID": 1,
      "userID": 5,
      "rating": 1
    };
    
    // const data = await fetchPOST('http://jadefse.local/wp-json/josh/v1/rate', form_data);
    const data = await fetchPOST(`${PHP.rest_url}/rate`, form_data);

    if (data.status === 2) { // success
      console.log('data: ', data);
      // log('response: ', data ), 'green';
    }
    else {
      // log('response: ', data ), 'red';
    }
  };

  // --------------------------------------------

  return (
    <div class="ml-1 flex items-center" onClick={() => {
      submitRating();
      closeModal();
    }}>
      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
      </svg>

      {/* <!-- Heroicon name: mini/star --> */}
      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
      </svg>

      {/* <!-- Heroicon name: mini/star --> */}
      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
      </svg>

      {/* <!-- Heroicon name: mini/star --> */}
      <svg class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
      </svg>

      {/* <!-- Heroicon name: mini/star --> */}
      <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
      </svg>
      
    </div>
  );
};

// ==============================================

export default function ModalRating({}) {

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
  
  const portal_root = document.querySelector('#react-portal-modal'); 

  // {/* Modal is actually a full-screen overlay. */}
  // {/* Inside the overlay is a container that stores the modal. */}
  // {/* You simply apply the gsap animation to the modal_ref (which is actually the overlay) 
  // and this handles both the modal and overlay */}
  // {/* We apply event.stopPropagation() to stop the event-bubbling of the event when the user clicks the internal container. */}
  // {/* We only want the modal to close when the user clicks outside the modal, so applying an event listern on the outer modal and stopping event-bubbling as described in the previous step on the internal container achieves this.  Event-Capturing phase is disabled by default and of no interest to us here. */}

  // --------------------------------------------

  const modal = createPortal( // portals preserve event delegation
    <div 
      ref={modal_ref} 
      style={{ 
        display: 'none',  // open => grid
        placeItems: 'center', 
        opacity: 0, 
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        width: '100vw', 
        height: '100vh', 
        minWidth: '350px',
        position: 'fixed', 
        zIndex: '10', 
        top: 0, 
        left: 0, 
        overflowY: 'scroll',
        padding: '50px 0',
      }}
      onClick={(e) => {
        console.log('clicked overlay outside of modal => close modal');
        closeModal();
      }}
    >

      <div 
        onClick={(e) => e.stopPropagation()}
        class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
      >
        <div       
          style={{ 
            borderRadius: '5px',
          }} 
        class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
        {/* <div class="relative flex w-full items-center overflow-hidden px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"> */}
          <button
            onClick={() => {
              console.log('clicked close modal (X) button => close modal');
              closeModal();
            }} 
            type="button" 
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
          >
            <span class="sr-only">Close</span>
            {/* <!-- Heroicon name: outline/x-mark --> */}
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* <div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8"> */}
          <div class="grid w-full items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">

            <Stars { ...{ closeModal } }/>

          </div>
        </div>
      </div>

    </div>,
    portal_root
  );

  // --------------------------------------------

  return (
    <>
      <div class="flex flex-1 justify-center pl-4">
        <button onClick={() => {
          // submitRating();
          openModal();
        }}href="#" class="whitespace-nowrap text-indigo-600 hover:text-indigo-500">Leave review</button>
      </div>
      {modal}
    </>
  );
}