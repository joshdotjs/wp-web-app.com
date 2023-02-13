// ==============================================

//  -For developers making manual Ajax requests, the nonce will need to be passed with each request. 
//   The API uses nonces with the action set to wp_rest. 
//   These can then be passed to the API via the _wpnonce data parameter 
//   (either POST data or in the query for GET requests), 
//   or via the X-WP-Nonce header.
//
//  -If no nonce is provided the API will set the current user to 0, 
//   turning the request into an unauthenticated request,
//   even if you’re logged into WordPress.
//
//  -supplying the nonce as a header is the most reliable approach.

const fetchGET = async (url) => {

  console.warn('PHP: ', PHP);
  

  // console.log('fetchGET: url: ', url);
  const res = await fetch(url, {
    method: 'GET',
    headers: { 
      "X-WP-Nonce": PHP.nonce,
    },    
  });
  const data = await res.json();
  return data;
};

// ==============================================

const fetchPOST = async (url, body, method='POST') => {

  // -Nonce is set on page refresh in header.php 
  //  where it is set into local storage 
  //  afer being passed into JS via a data-set attribute
  //  in index.js above rendering <Header />
  // const nonce = localStorage.getItem('nonce');

  // console.warn('fetchPOST - LS nonce: ', nonce);

  debugger;
  console.warn('PHP: ', PHP);
  console.log('url: ', url);
  console.log('body: ', body);
  
  
  const res = await fetch(
    url, {
      method,
      headers: { 
        "Content-Type": 'application/json',
        "X-WP-Nonce": PHP.nonce,
      },
      body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
};

// ==============================================

export { fetchGET, fetchPOST };




