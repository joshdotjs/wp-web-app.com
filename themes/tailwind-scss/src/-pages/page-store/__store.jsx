import React from 'react';
// import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";


// import Layout from '@/comps/_layout/_layout';
import Layout from 'comps/_layout/_layout';

// import Page from './_store';

import img from 'img/accessories-1.webp';

// import './__store.scss';
// import './josh.scss';
// import './josh.css';

// ==============================================

const main_root = document.querySelector('#react-root-store');
if(main_root){

  // console.log('main_root.dataset: ', main_root.dataset);
  // console.log('main_root.dataset.products: ', main_root.dataset.products);

  // const API_URL_NODE = main_root.dataset.apiUrlNode;
  // console.log('API_URL_NODE: ', API_URL_NODE);

  // window.API_URL_NODE      = main_root.dataset.apiUrlNode;
  // window.API_URL_LARAVEL   = main_root.dataset.apiUrlLaravel;
  // window.PRODUCTS_PER_PAGE = 6;
  // const products_SSR       = JSON.parse(main_root.dataset.products); // encodes variants
  // console.log('products_SSR: ', products_SSR);

  // main_root.removeAttribute('data-products');
  // const num_products_SSR = main_root.dataset.numProducts;

  // <Layout name="store">
    // <Page {...{products_SSR, num_products_SSR}} />
  // </Layout>

  ReactDOM.render(
    <Layout name="store">
      <div id="josh-josh">
        Page Store
        {/* <img src={'https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png'}  height="100" width="100" /> */}
        <img src={img}  height="100" width="100" />
      </div>
    </Layout>
    ,
    main_root
  );
}

// ==============================================