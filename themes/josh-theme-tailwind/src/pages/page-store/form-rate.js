import React, { useState, useEffect, useRef } from 'react';

// ==============================================

const fireEvent = (x) => dispatchEvent(new Event(x));

// ==============================================

const lc = (x) => { console.log('%c' + x, 'color: cyan'); };
const lg = (x) => { console.log('%c' + x, 'color: green'); };
const lo = (x) => { console.log('%c' + x, 'color: darkorange'); };
const lp = (x) => { console.log('%c' + x, 'color: hotpink'); };
const lb = (x) => { console.log('%c' + x, 'color: deepskyblue'); };
const lr = (x) => { console.log('%c' + x, 'color: red'); };
const ly = (x) => { console.log('%c' + x, 'color: yellow'); };

// ==============================================

const fetchGET = async (path) => {
  const res = await fetch(path);
  const data = await res.json();
  return data;
};

// ==============================================

export default function FormRate() {

  // --------------------------------------------

  const [rate_form, setRateForm] = useState( { rating: 7.5, postID: 53, userID: 1 } );
  const updateRateForm = (key) => (e) => setRateForm( (prev) => ({...prev, [key]: e.target.value }) );


  // --------------------------------------------

  const submitRating = async () => {
  
    lo('submitting rating...');
    
    // const endpoint = props.auth_rest.rate;
    const endpoint = 'http://jadefse.local/wp-json/up/v1/rate';
    console.log('endpoint: ', endpoint);
    
    const { rating, postID, userID } = rate_form;

    // console.log('rating: ', rating, '\t postID: ', postID);

    const res = await fetch(
      endpoint, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({ 
          testing: 'from submitRating() frontend.js',
          postID: Number(postID), // adminer - wp_posts - select data - #1: Hello world!!
          rating: Number(rating),
          userID: Number(userID)
        })
    });

    const res_json = await res.json();
    
    if (res_json.status === 2) {
      lg('response: ' + JSON.stringify(res_json) );
    }
    else {
      lr('response: ' + JSON.stringify(res_json) );
    }
  }

  // --------------------------------------------

  return (
    <div id="rate-form" 
    style={{
      position: 'absolute',
      top: 50, right: 0,
      background: 'lightgray'
    }}>
      <div style={{border: 'solid black 1px', width: 'fit-content'}}>
        <input type="number" placeholder="rating" value={rate_form.rating} onChange={updateRateForm('rating')} style={{display: 'inline-block'}}/>
        <p style={{display: 'inline-block'}}>Rating: {rate_form.rating}</p>
      </div>
      <div style={{border: 'solid black 1px', width: 'fit-content'}}>
        <input type="number" placeholder="post ID" value={rate_form.postID} onChange={updateRateForm('postID')} style={{display: 'inline-block'}}/>
        <p style={{display: 'inline-block'}}>post ID: {rate_form.postID}</p>
      </div>
      <div style={{border: 'solid black 1px', width: 'fit-content'}}>
        <input type="number" placeholder="post ID" value={rate_form.userID} onChange={updateRateForm('userID')} style={{display: 'inline-block'}}/>
        <p style={{display: 'inline-block'}}>user ID: {rate_form.userID}</p>
      </div>

      <button 
      onClick={submitRating}
      >
        Submit Rating
      </button>

    </div>
  );
}
