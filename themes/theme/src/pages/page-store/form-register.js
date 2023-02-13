import React, { useState, useEffect, useRef } from 'react';


// ==============================================

const getCartLS = () => JSON.parse(localStorage.getItem('cart'));
const updateCartLS = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

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

export default function FormAuth(props) {

  // --------------------------------------------

  const [auth_form, setAuthForm] = useState( {username: '', email: '', password: '' } );
  const updateAuthForm = (key) => (e) => setAuthForm( (prev) => ({...prev, [key]: e.target.value }) );

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

  return (
    <div>
      <div id="registration-form">
        <div style={{border: 'solid black 1px', width: 'fit-content'}}>
          <input type="text" placeholder="username" value={auth_form.username} onChange={updateAuthForm('username')} style={{display: 'inline-block'}}/>
          <p style={{display: 'inline-block'}}>Username: {auth_form.username}</p>
        </div>
        <div style={{border: 'solid black 1px', width: 'fit-content'}}>
          <input type="text" placeholder="email" value={auth_form.email} onChange={updateAuthForm('email')} style={{display: 'inline-block'}}/>
          <p style={{display: 'inline-block'}}>email: {auth_form.email}</p>
        </div>
        <div style={{border: 'solid black 1px', width: 'fit-content'}}>
          <input type="text" placeholder="password" value={auth_form.password} onChange={updateAuthForm('password')} style={{display: 'inline-block'}}/>
          <p style={{display: 'inline-block'}}>password: {auth_form.password}</p>
        </div>

        <div class="btn" onClick={submitAuthForm('login')}>Login</div>
        <div class="btn" onClick={submitAuthForm('register')}>Register</div>
      </div>
    </div>
  );
}
