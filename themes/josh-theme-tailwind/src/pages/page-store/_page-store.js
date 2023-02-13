import React, { useState, useEffect, useRef } from "react";
import { gsap } from 'gsap';

import MobileFilters from './store-mobile-filters';
import Footer from "./store-footer";
import Main from "./store-main";

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../util/log';
import { getFiltersLS } from '../../util/local-storage';
import { fireEvent } from '../../util/custom-event';
import { fetchGET, fetchPOST } from '../../util/fetch';
import { set2arr } from '../../util/transform';

// let renders = 0;

// ==============================================

export default function PageStore()  {

  // console.log('---------- render: ', renders++);
  
  // --------------------------------------------

  const [products, setProducts] = useState([]);

  // --------------------------------------------

  // const updateProducts = async (curr_filters, sort_type={ col: 'title', type: 'ASC' }) => { // try to call this in the setFilters callback passing in the newly to update filters value - don't rely on useEffect - do it more in-line'ish
  const updateProducts = async ({ curr_filters, sort_type }) => { // try to call this in the setFilters callback passing in the newly to update filters value - don't rely on useEffect - do it more in-line'ish
      
    // -Default vals - if immediate values not specified then simply use current values in state.
    //  --My goal is to use in-place non-useEffect updates to not have to wait for the state to update to do stuff.
    //  --I find that avoiding useEffect updates as much as possible just makes everything simpler.
    if (curr_filters === undefined)   curr_filters = filters;
    if (sort_type === undefined)      sort_type = sort;

    // console.clear();
    lo('updateProducts() -- sending request');
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
    console.log('body: ', body);

    // console.log('body: ', body);
    const data = await fetchPOST(url, body); // custom endpoint
    // console.log('response: ', data);

    if (data.status === 2) {
      const { status, message, num_products, products} = data;
      setProducts(products);
    } else {
      console.log('response: ', data);
      console.warn('error in _page-store.jsx  --  updateProducts()');
    }

  };

  // -----------------------------------------------

  const [ mobile_filters_open, setMobileFiltersOpen ] = useState(false);

  // --------------------------------------------

  const mobile_filters_overlay_ref = useRef(null);

  // --------------------------------------------


  const openMobileFilters = () => { 
    setMobileFiltersOpen(true);

    // lr('opening mobile-filters drawer');
    const ref = mobile_filters_overlay_ref.current;
    ref.style.display = 'block';
    gsap.to(ref, { 
      opacity: 1, 
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      },
    });
  }

  // -----------------------------------------------

  const closeMobileFilters = () => { 
    setMobileFiltersOpen(false); 

    const ref = mobile_filters_overlay_ref.current;
    gsap.to(ref, { 
      opacity: 0,
        duration: 0.3, 
        onComplete: () => {
          ref.style.display = 'none';
          document.body.style.overflow = "overlay"; // custom scrollbar overlay
        },
      }
    );
  }

  // -----------------------------------------------

  // const toggleMobileFilters = () => { setMobileFiltersOpen(prev => !prev); }

  // --------------------------------------------
  
  const [ num_active_filters, setNumActiveFilters ] = useState(0);
  
  const money_max = 500;
  const money_min = 0;
  const stock_max = 50;
  const stock_min = 0;
  
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
    getTag()         { return this.getTags()[0];         },
    getDepartment()  { return this.getDepartments()[0];  },
  });

  const resetFilters = () => {
    setFilters(prev => ({ 
      ...prev,
      categories:     new Set(),
      tags:           new Set(),
      colors:         new Set(),
      sizes:          new Set(),
      departments:    new Set(),
      price:          { min: money_min, max: money_max    },
      stock:          { min: stock_min, max: stock_max    },
    }))
  };

  // --------------------------------------------

  // Update products on page load:
  useEffect(() => {

    // - - - - - - - - - - - - - - - - - - - - - 

    console.log('filters: ', filters);

    // - - - - - - - - - - - - - - - - - - - - - 

    let curr_filters;

    // Check local storage for filters:
    const ls_filters = getFiltersLS(); // returns null if the key in local-storage does not exist
    if (ls_filters !== null) {
      // -One off on page load.
      // -Navlink click from /store page just updates filters and products inline without LS-update.
  
      // -Currently only watching the filters corresponding to navlinks:
      const { tag, department, category } = ls_filters;
      
      setFilters((prev) => {    
        const new_filters = {
          ...prev,
          tags:        new Set(tag && [tag]),
          departments: new Set(department && [department]),
          categories:  new Set(category && [category]),
        };
        curr_filters = new_filters;
        return new_filters;
      });

      // -local-storage filters only used on page load when navigating to this page from navlink
      localStorage.removeItem('filters');

    } else {
      curr_filters = filters;
    }

    // - - - - - - - - - - - - - - - - - - - - - 

    // -Update the filtered products via a GET request
    updateProducts({ curr_filters });

    // - - - - - - - - - - - - - - - - - - - - - 

    // -Trying to emulate SPA behavior with non-SPA routing - don't do this.
    // -Just refresh page -- when rebuilding this with complete SPA we can avoid the page refresh.
    //   // -Hanlde the case when the user clicks the navlink if already on /store page:
    //   addEventListener('navlink', loadFiltersFromLS);
    //   return () => removeEventListener('navlink', loadFiltersFromLS);

  }, []);

  // --------------------------------------------

  const filterChangeHandler = ({ target }) => {

    const {name, value, type, checked} = target;
 
    lg('filterChangeHanlder()');
    console.log('name: ', name);
    console.log('value: ', value);
    console.log('checked: ', checked);
    console.log('type: ', type);

    // - - - - - - - - - - - - - - - - - - - - - 

    if (type === 'checkbox') {

      setFilters((prev) => {
        const property_val = prev[name]; // Set
        let new_val = new Set(property_val);
        if (checked === true) {
          new_val.add(value);
        } else {
          new_val.delete(value);
        }
  
        const new_filters = { ...prev, [name]: new_val };
        updateProducts({ curr_filters: new_filters });
        updateNumActiveFilters(new_filters);
        return new_filters;
      });
    }

    // - - - - - - - - - - - - - - - - - - - - - 

    if (type === 'radio') {
      setFilters((prev) => {
        let new_val;
        if (Array.isArray(value)) {
          new_val = new Set([...value]); // all
        } else {
          new_val = new Set([value]); // mutually exclusive 
        }
        const new_filters = { ...prev, [name]: new_val };
        updateProducts({ curr_filters: new_filters });
        updateNumActiveFilters(new_filters);
        return new_filters;
      });
    }

    // - - - - - - - - - - - - - - - - - - - - - 
        
    //if (type === 'slider') {
    if (type === 'number') {
      
      setFilters(prev => {
        let new_filters;
        
        if (name === 'price-min')
          new_filters = { ...prev, price: { min: value,               max: prev['price'].max } };
        if (name === 'price-max')
          new_filters = { ...prev, price: { min: prev['price'].min,   max: value             } };
        updateProducts({ curr_filters: new_filters });
        updateNumActiveFilters(new_filters);
        return new_filters;
      });

    }

    // - - - - - - - - - - - - - - - - - - - - - 


    const updateNumActiveFilters = (curr_filters) => {
      let new_num_active_filters = 0;
      // for (let key of ['categories', 'tags', 'colors', 'sizes', 'departments'])
      for (let key of ['categories', 'colors', 'sizes'])
        new_num_active_filters += curr_filters[key].size;
      setNumActiveFilters(new_num_active_filters);
    };

    // - - - - - - - - - - - - - - - - - - - - - 
    
  };
 
  // --------------------------------------------

  // -For dropdown (filters and add new category in header)
  const [categories, setCategories] = useState([
    { value: 'shirt', label: 'Shirt' }, 
    { value: 'pants', label: 'Pants' }, 
    { value: 'shoes', label: 'Shoes' },
  ]); // dropdown checkbox options
  const [tags, setTags] = useState([
    { value: 'new',  label: 'New' }, 
    { value: 'sale', label: 'Sale' }, 
  ]); // dropdown checkbox options
  const [departments, setDepartments] = useState([
    { value: 'men',    label: 'Men' }, 
    { value: 'women',  label: 'Women' }, 
  ]); // dropdown checkbox options
  const [colors, setColors] = useState([
    { value: 'red',  label: 'Red' }, 
    { value: 'blue', label: 'Blue' }, 
  ]); // dropdown checkbox options
  const [sizes, setSizes] = useState([
    { value: 'sm',  label: 'SM' }, 
    { value: 'lg',  label: 'LG' }, 
  ]); // dropdown checkbox options

  useEffect(() => { // initialize categories on page load

    console.log('useEffect[] - categories');
    
    // - - - - - - - - - - - - - - - - - - - - - 
    
    const getCategories = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/categories';
      const url = `${PHP.rest_url}/categories`;
      const { categories } = await fetchGET(url);
      setCategories(categories);
    };
    getCategories();   
    
    // - - - - - - - - - - - - - - - - - - - - -

    const getTags = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/tags';
      const url = `${PHP.rest_url}/tags`;
      const { tags } = await fetchGET(url);
      setTags(tags);
    };
    getTags();   

    // - - - - - - - - - - - - - - - - - - - - - 

    const getDepartments = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/departments';
      const url = `${PHP.rest_url}/departments`;
      const { departments } = await fetchGET(url);
      setDepartments(departments);
    };
    getDepartments();  

    // - - - - - - - - - - - - - - - - - - - - - 

    const getColors = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/colors';
      const url = `${PHP.rest_url}/colors`;
      const { colors } = await fetchGET(url);
      setColors(colors);
    };
    getColors();   

    // - - - - - - - - - - - - - - - - - - - - - 

    const getSizes = async () => {     
      // const url = 'http://jadefse.local/wp-json/josh/v1/sizes';
      const url = `${PHP.rest_url}/sizes`;
      const { sizes } = await fetchGET(url);
      setSizes(sizes);
    };
    getSizes();  

    // - - - - - - - - - - - - - - - - - - - - - 

  }, []);

  // --------------------------------------------

  const [sort, setSort] = useState( {col: 'title', type: 'ASC' });

  // --------------------------------------------

  // --------------------------------------------

  return ( 
    <div class="bg-white">

      <div> 


        {/* Mobile Filters: */}


        <MobileFilters { ...{ 
            filters, closeMobileFilters, filterChangeHandler,
            categories, tags, colors, sizes, 

            mobile_filters_overlay_ref,
            mobile_filters_open,
          }}
        /> 


        <Main { ...{ 
            products, 
            openMobileFilters,
            categories, 
            tags, 
            colors, 
            sizes, 
            filters,  filterChangeHandler,
            num_active_filters,

            updateProducts, setSort,
          } } 
          num_filtered_products={products.length}
        />


        <Footer />


      </div>
    
    </div>
  );

  // -----------------------------------------------
};