import React, { useState, useEffect, useRef } from "react";

import { fetchGET } from "../../util/fetch";

export default function AboutPage() {

  return (
    <div style={{
      background: 'deepskyblue',
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: 100,
      padding: '0.5rem',
      color: 'white',
      height: '50vh',
      width: '100vw',
    }}>
      (React) Page: About


      <buton 
        style={{ 
          height: '100px', 
          background: 'red',
          cursor: 'pointer',
          marginLeft: '2rem',
        }}
        onClick={async () => {
          console.log('clicked');

          // const data = await fetchGET('/wp-json/josh/v1/restricted-logged-in');
          const data = await fetchGET(`${PHP.rest_url}/restricted-logged-in`);
          console.log('data: ', data);
        }}
      >
        Restricted: Must be logged in 
      </buton>

      <buton 
        style={{ 
          height: '100px', 
          background: 'red',
          cursor: 'pointer',
          marginLeft: '2rem',
        }}
        onClick={async () => {
          console.log('clicked');

          // const data = await fetchGET('/wp-json/josh/v1/restricted-admin');
          const data = await fetchGET(`${PHP.rest_url}/restricted-admin`);
          console.log('data: ', data);
        }}
      >
        Restricted: Must be admin
      </buton>

    </div>
  );
};