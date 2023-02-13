import { useState, useEffect } from 'react';

import Header from './header';
import Filters from './filters';
import Table from './table';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../../util/log';
// import { getLS, setLS } from '../../../util/local-storage';
// import { fireEvent } from '../../../util/custom-event';
import { fetchGET, fetchPOST } from '../../../util/fetch';
import { set2arr } from '../../../util/transform';

// ==============================================

export default function PanelProducts({panel_refs}) {

  // --------------------------------------------
  
  const [products, setProducts] = useState([]);

  // --------------------------------------------

  const money_max = 500;
  const money_min = 0;
  const stock_max = 50;
  const stock_min = 0;

  // --------------------------------------------

  const [sort, setSort] = useState( {col: 'title', type: 'ASC' });

  // --------------------------------------------
  
  const [ filters, setFilters ] = useState({
    categories:     new Set(),
    tags:           new Set(),
    colors:         new Set(),
    sizes:          new Set(),
    departments:    new Set(),
    price:           { min: money_min, max: money_max    },
    stock:           { min: stock_min, max: stock_max    },
    getCategories()  { return set2arr(this.categories);  },
    getTags()        { return set2arr(this.tags);        },
    getColors()      { return set2arr(this.colors);      },
    getSizes()       { return set2arr(this.sizes);       },
    getDepartments() { return set2arr(this.departments); },
    getPrice()       { return this.price;                },
    getStock()       { return this.stock;                },
  });

  // --------------------------------------------

  const resetFilters = () => {
    setFilters(prev => ({ 
      ...prev,
      categories:     new Set(),
      tags:           new Set(),
      colors:         new Set(),
      sizes:          new Set(),
      departments:    new Set(),
      price:          { min: money_min, max: money_max },
      stock:          { min: stock_min, max: stock_max },
    }))
  };

  // --------------------------------------------

  // const updateProducts = async (curr_filters, sort_type={ col: 'title', type: 'ASC' }) => { // try to call this in the setFilters callback passing in the newly to update filters value - don't rely on useEffect - do it more in-line'ish
  const updateProducts = async ({ curr_filters, sort_type }) => { // try to call this in the setFilters callback passing in the newly to update filters value - don't rely on useEffect - do it more in-line'ish
      
    // -Default vals - if immediate values not specified then simply use current values in state.
    //  --My goal is to use in-place non-useEffect updates to not have to wait for the state to update to do stuff.
    //  --I find that avoiding useEffect updates as much as possible just makes everything simpler.
    if (curr_filters === undefined)   curr_filters = filters;
    if (sort_type === undefined)      sort_type = sort;

    // console.clear();
    // lo('updateProducts() -- sending request');
    // console.log('curr_filters: ', curr_filters);

    // const url = 'http://jadefse.local/wp-json/josh/v1/products';
    const url = `${PHP.rest_url}/products`;
    // const data = await fetchGET(url); // custom endpoint

    const body = { 
      categories:  curr_filters.getCategories(),
      colors:      curr_filters.getColors(),
      sizes:       curr_filters.getSizes(),
      price:       curr_filters.getPrice(),
      tags:        curr_filters.getTags(),
      departments: curr_filters.getDepartments(),
      stock:       curr_filters.getStock(),
      sort:        { col: sort_type.col, type: sort_type.type },
    };

    // console.log('body: ', body);
    const data = await fetchPOST(url, body); // custom endpoint
    // console.log('data: ', data);
    const { status, message, num_products, products} = data;
    setProducts(products);
    // console.log('products: ', products);
    // console.clear();
    // log(data, 'lightgreen', 'response');

  };

  // --------------------------------------------

  // -For dropdown (filters and add new category in header)
  const [categories, setCategories] = useState([
    { value: 'shirt', label: 'Shirt' }, 
    { value: 'pants', label: 'Pants' }, 
    { value: 'shoes', label: 'Shoes' },
  ]); // dropdown checkbox options

  useEffect(() => { // initialize categories on page load
    const getCategories = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/categories';
      const url = `${PHP.rest_url}/categories`;
      const { categories } = await fetchGET(url);
      setCategories(categories);
    };
    getCategories();   
  }, []);

  // --------------------------------------------

  // -For dropdown  (filters and add new category in header)
  const [tags, setTags] = useState([
    { value: 'new',  label: 'New' }, 
    { value: 'sale', label: 'Sale' }, 
  ]); // dropdown checkbox options

  useEffect(() => { // initialize categories on page load
    const getTags = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/tags';
      const url = `${PHP.rest_url}/tags`;
      const { tags } = await fetchGET(url);
      setTags(tags);
    };
    getTags();   
  }, []);

  // --------------------------------------------

  // -For dropdown
  const [departments, setDepartments] = useState([
    { value: 'men',    label: 'Men' }, 
    { value: 'women',  label: 'Women' }, 
  ]); // dropdown checkbox options
  useEffect(() => { // initialize categories on page load
    const getDepartments = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/departments';
      const url = `${PHP.rest_url}/departments`;
      const { departments } = await fetchGET(url);
      setDepartments(departments);
    };
    getDepartments();   
  }, []);

  // --------------------------------------------

  // -For dropdown (filters and add new color in header)
  const [colors, setColors] = useState([
    { value: 'red',  label: 'Red' }, 
    { value: 'blue', label: 'Blue' }, 
  ]); // dropdown checkbox options
  useEffect(() => { // initialize categories on page load
    const getColors = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/colors';
      const url = `${PHP.rest_url}/colors`;
      const { colors } = await fetchGET(url);
      setColors(colors);
    };
    getColors();   
  }, []);

  // --------------------------------------------

  // -For dropdown
  const [sizes, setSizes] = useState([
    { value: 'sm',  label: 'SM' }, 
    { value: 'lg',  label: 'LG' }, 
  ]); // dropdown checkbox options
  useEffect(() => { // initialize categories on page load
    const getSizes = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/sizes';
      const url = `${PHP.rest_url}/sizes`;
      const { sizes } = await fetchGET(url);
      setSizes(sizes);
    };
    getSizes();   
  }, []);

  // --------------------------------------------

  return (
    <div 
      id="panel-2" 
      // ref={(el) => panel_refs.current[2] = el} 
      ref={(el) => panel_refs.current[1] = el} 
      class="mt-8 mb-8 border border-sky-500 w-full" 
      style={{
        // border: 'dashed hotpink 5px', 
        // position: 'absolute', zIndex: 0, opacity: 0}}
        position: 'absolute', 
        zIndex: 0, 
        opacity: 0,
        display: 'none'
        
        // zIndex: 1, 
        // opacity: 1,
        // display: 'block'
      }}
    >

      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        
        <Header { ...{
            categories, setCategories,
            tags, setTags,
            colors, setColors,
            sizes, setSizes,
            departments, setDepartments,
            resetFilters,
            updateProducts
          } }
        />

        <Filters { ...{ 
            categories, setCategories, 
            tags, setTags,
            colors, setColors,
            sizes, setSizes,
            departments, setDepartments,
            updateProducts,
            filters, setFilters,
            money_max, money_min,
            stock_max, stock_min,
          } } 
          num_filtered_products={products.length}
        />

        <Table products={products} { ...{
            categories, setCategories,
            tags, setTags,
            colors, setColors,
            sizes, setSizes,
            departments, setDepartments,
            resetFilters,
            updateProducts,
          }} 
        />

      </div>

    </div>
  );
}