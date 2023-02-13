import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { Modal } from '@mantine/core';


import Button from '../../../comps/button/button';
import DropdownOptionsRadio from './dropdown-options-radio';
import Images from './images';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../../util/log';
import { getLS, setLS } from '../../../util/local-storage';
import { fireEvent } from '../../../util/custom-event';
import { fetchGET, fetchPOST } from '../../../util/fetch';
import { set2arr, slug, singleSpace, toMB } from '../../../util/transform';

// ==============================================

export default function CreateUpdateProductsModal({ 
  categories, setCategories,
  tags, setTags,
  colors, setColors,
  sizes, setSizes,
  departments, setDepartments,
  opened, setOpened,
  CRUD_type, // 'create' or 'update'
  resetFilters,
  id=null,
  updateProducts,
}) {

  // --------------------------------------------

  let modal_details = {
    button_text: '',
  };
  if (CRUD_type === 'create') {
    modal_details['button_text'] = 'Create';
  }
  if (CRUD_type === 'update') {
    modal_details['button_text'] = 'Update';
  }


  // --------------------------------------------
  
  // const [opened, setOpened] = useState(true); // up one level at header
  const [opened_image_modal, setOpenedImageModal] = useState(false);

  const [enable_form_submit, setEnableFormSubmit] = useState(false);
  
  const [active_dropdown_idx, setActiveDropdownIdx] = useState(-1); // used to set the z-index high on the active dropdown
  // useEffect(() => {
  //   console.log('active dropdown idx: ', active_dropdown_idx);
  // }, [active_dropdown_idx]);

  // --------------------------------------------

  const [ form, setForm ] = useState({
    title: null,
    description: null,
    price: null,
    stock: null,
    image: { id: null, url: null, height: null, width: null },

    // -Currently using the same logic as in filters.
    // -In form we want there to only be one value for each of these (mutually exclusive)
    // -Need to check out the dropdown to make sure I can modify these from Sets to single values.
    // -To easily change the logic without modifying the Dropdown component, simply
    //  clear the set and then set on the onChange handler for the form.
    // -This allows only one value in the set.
    // -Just extract the zero'th element after mapping to an array in the getter functions.
    categories:    new Set(),
    tags:          new Set(),
    colors:        new Set(),
    sizes:         new Set(),
    departments:   new Set(),

    getCategories()  { return set2arr(this.categories);  },
    getTags()        { return set2arr(this.tags);        },
    getColors()      { return set2arr(this.colors);      },
    getSizes()       { return set2arr(this.sizes);       },
    getDepartments() { return set2arr(this.departments); },

    getCategory()   { return this.getCategories()[0];  },
    getTag()        { return this.getTags()[0];        },
    getColor()      { return this.getColors()[0];      },
    getSize()       { return this.getSizes()[0];       },
    getDepartment() { return this.getDepartments()[0]; },

    getReqBody() {
      const body = { 
        title:        singleSpace(this.title),
        slug:         slug(this.title),
        description:  this.description,
        category:     this.getCategory(),
        color:        this.getColor(),
        size:         this.getSize(),
        tag:          this.getTag(),
        department:   this.getDepartment(),
        price:        this.price,
        stock:        this.stock,
        image_url:    this.image.url,
        image_id:     this.image.id,
        image_height: this.image.height,
        image_width:  this.image.width,
      };
      return body;
    },
  });

  useEffect(() => {
    // console.log('form: ', form, 
    //   '\nform.title: ', form.title,
    //   '\nform.price: ', form.price,
    //   '\nform.stock: ', form.stock,
    // );

    if (form.title && form.price && form.stock) {
      setEnableFormSubmit(true);
    }
  }, [form]);

  const resetForm = () => {
    setForm(prev => ({ 
      ...prev,
      title: null,
      description: null,
      price: null,
      stock: null,
      image: { id: null, url: null, height: null, width: null }, 
    }));
    setEnableFormSubmit(false);
  };

  // --------------------------------------------

  const validation_error_refs = useRef([]);

  const [form_validation_error, setFormValidationError] = useState({
    price: false,
    stock: false,
  });

  const applyError = (idx) => {
    const tl = gsap.timeline({ repeat: 0 }); 

    const container = validation_error_refs.current[idx];   
    const error_message = container.querySelector('#error-message');
    const error_icon = container.querySelector('#error-icon');

    const duration = 0.2;
    gsap.to(error_message, { opacity: 1, duration, });
    gsap.to(error_icon,    { opacity: 1,  duration, });

    const dur = 0.1;
    const dist = 5;
    tl.to(container, { x:  dist, duration: dur / 2 })
      .to(container, { x: -dist, duration: dur })
      .to(container, { x:  dist, duration: dur })
      .to(container, { x: -dist, duration: dur })
      .to(container, { x:  0,    duration: dur / 2 });

  };

  const removeError = (idx) => {

    const container = validation_error_refs.current[idx];
    const error_message = container.querySelector('#error-message');
    const error_icon = container.querySelector('#error-icon');

    const duration = 0.2;
    gsap.to(error_message, { opacity: 0, duration, });
    gsap.to(error_icon,    { opacity: 0, duration, });

  };

  // --------------------------------------------

  const formChangeHandler = ({ target }) => {
 
    const {name, value, type, checked} = target;
 
    console.log('type: ', type);

    if (type === 'text' || type === 'textarea') {
      setForm((prev) => {
        const new_form = { ...prev, [name]: value };
        return new_form;
      });
    }

    if (type === 'checkbox') {
      setForm((prev) => {
        const property_val = prev[name]; // Set
        let new_val = new Set(property_val);
        if (checked === true) {
          new_val.clear(); // HACK TO MIMICK RADIO (see notes above in 'form' state definition)
          new_val.add(value);
        } else {
          new_val.delete(value);
        }
  
        const new_form = { ...prev, [name]: new_val };
        return new_form;
      });
    }
    
    if (type === 'slider') {
      
      const { min, max } = target;
      console.log('updating slider for money, max: ', max, '\tmin: ', min);
      setForm(prev => {
        const new_form = { ...prev, [name]: { max, min } };
        return new_form;
      });
    }

    if (type === 'image') {
      const { image_id, image_url, image_width, image_height } = target;
      console.log('updating form for image, image_id: ', image_id, '\timage_url: ', image_url);
      setForm(prev => {
        const new_form = { ...prev, [name]: { id: image_id, url: image_url, height: image_height, width: image_width } };
        return new_form;
      });
    }

    if (type === 'number') {

      const mapping_to_ref = ['price', 'stock'];
      const idx = mapping_to_ref.findIndex(elem => elem === name);

      if (idx < 0)
        console.error('formChangeHandler() -- mapping_to_ref needs to be updated!');

      if ( value < 0 ) {

        applyError(idx);

        setFormValidationError((prev) => ({
          ...prev,
          [name]: true,
        }));       

      } else {

        setFormValidationError((prev) =>  {

          const is_currently_in_error_state = prev[name];
  
          if (is_currently_in_error_state) {
            removeError(idx);
          }

          return {
            ...prev,
            [name]: false,
        }});

        setForm(prev => {
          return {
            ...prev,
            [name]: Number(value)
          };
        });

      } // validation

    }
    
  };

  // --------------------------------------------
  
  
  const submitFormHandler = async () => {
    
    // console.clear();
    lo('sending request (panel products)');

    
    const body = form.getReqBody();
    console.log('body: ', body);
    
    let method, url;
    if (CRUD_type === 'create') {
      // url = 'http://jadefse.local/wp-json/josh/v1/product';
      url = `${PHP.rest_url}/product`;
      method = 'POST';
    } else if (CRUD_type === 'update') {
      // url = `http://jadefse.local/wp-json/josh/v1/product/${id}`;
      url = `${PHP.rest_url}/product/${id}`;
      method = 'PUT';
    } else { console.error('only create and update allowed'); }
    
    const res = await fetchPOST(url, body, method); // custom endpoint
    
    console.log('Form submitted - res: ', res);
    // const { status, message, num_products, products} = data;
    // setProducts(products);
    // log(data, 'lightgreen', 'response');

    resetFilters(); 
    updateProducts({});
  };
  
  // --------------------------------------------
  
  
  
  // --------------------------------------------
  
  
  
  // --------------------------------------------
  
  return (
    <>
      {/* ----------------------------------- */}

      {/* Create Product Modal */}

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        // title="Introduce yourself!"
        transition="fade"
        transitionDuration={400}
        exitTransitionDuration={400}
        transitionTimingFunction="ease"
        overlayColor='black'
        overlayOpacity={0.7}
        // overlayBlur={3}
        // fullScreen={true}
        // closeOnClickOutside={false}
        size="90%"
      >

        <div class="container mx-auto sm:px-6 lg:px-8">

          {/* - - - - - - - - - - - - - - - - */}

          <div id="create-product-content">
            <div>
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Public Product Information</h3>
                    <p class="mt-1 text-sm text-gray-600">
                      This information will be displayed publicly so be careful what you add.
                    </p>
                  </div>
                </div>
                <div class="mt-5 md:col-span-2 md:mt-0">

                    <div class="shadow sm:overflow-hidden sm:rounded-md">
                      <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-3 gap-6">
                          <div class="col-span-3 sm:col-span-2">
                            <label htmlFor="create-product-title-field" class="block text-sm font-medium text-gray-700">
                              Product Title 
                              <span class="text-gray-400">{' '}(required)</span>
                            </label>
                            <div class="mt-1 flex rounded-md shadow-sm">

                              <input
                                type="text" 
                                name="title" 
                                value={form.title}
                                onChange={formChangeHandler}
                                id="create-product-title-field"
                                class="block w-full flex-1 rounded-md rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                // placeholder="enter product title here..."
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="create-product-description-field" class="block text-sm font-medium text-gray-700">
                            Product Description
                          </label>
                          <div class="mt-1">
                            <textarea
                              rows={3}
                              defaultValue={''}
                              name="description" 
                              value={form.description}
                              onChange={formChangeHandler}
                              id="create-product-description-field"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              // placeholder="enter product details here..."
                            />
                          </div>
                          <p
                            class="text-sm text-gray-500">
                            Brief description of the product details.
                          </p>
                        </div>

                        <div>
                          <label
                            style={{ marginBottom: '0.5rem' }} 
                            class="mt-4 mb-4 block text-sm font-medium text-gray-700">Image</label>
                          <div class="mt-1 flex items-center" style={{ alignItems: 'end' }}>
                            {/* <span class="inline-block h-20 w-20 overflow-hidden rounded-lg bg-gray-100"> */}
                            <span class="inline-block h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                            {/* <span class="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"> */}
                              {
                                form.image.url 
                                  ?
                                    <img 
                                      class="object-cover pointer-events-none h-full"
                                      // style={{ height: '50px' }}
                                      src={form.image.url}
                                    />
                                  : 
                                    // <svg style={{alignItems: 'end'}} class="h-full w-full text-gray-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    //   <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    //   <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                    // </svg>
                                    <svg class="h-full w-full text-gray-300" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                    </svg>
                              }
                            </span>
                            <Button
                              onClick={() => {
                                setOpenedImageModal(true);
                              }}
                              variant='light'
                              type="button"
                              // style={{ marginLeft: '1rem' }}
                              // class="ml-4 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              classes='ml-4'
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                        
                        {/* Drag and Drop image Upload 
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Cover photo</label>
                          <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div class="space-y-1 text-center">
                              <svg
                                class="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div class="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                </label>
                                <p class="pl-1">or drag and drop</p>
                              </div>
                              <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        </div>
                        */}
                      </div>
                      <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          disabled={!enable_form_submit}
                          onClick={() => {
                            submitFormHandler();
                            resetForm();
                            setOpened(false);
                          }}
                          type="submit"
                          class={`
                            inline-flex justify-center 
                            rounded-md border border-transparent 
                            bg-indigo-600 py-2 px-4 text-sm font-medium text-white 
                            shadow-sm 
                            ${ enable_form_submit === true  ? 'cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : '' }
                          `}
                          style={ enable_form_submit === true ? {} : { opacity: 0.2 }}
                        >
                          {modal_details['button_text']}
                        </button>
                      </div>
                    </div>

                </div>
              </div>
            </div>

            {/* Divider: */}
            <div class="hidden sm:block" aria-hidden="true">
              <div class="py-5">
                <div class="border-t border-gray-200" />
              </div>
            </div>

            {/* Numerical Product Information Section: */}
            <div class="mt-10 sm:mt-0">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Numerical Product Information</h3>
                    <p class="mt-1 text-sm text-gray-600">Specify the numerical data for the product.</p>
                  </div>
                </div>
                <div class="mt-5 md:col-span-2 md:mt-0">

                  <div class="overflow-hidden shadow sm:rounded-md">
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div class="grid grid-cols-6 gap-6">
                        {/* <div class="col-span-6 sm:col-span-3">
                          <label htmlFor="first-name" class="block text-sm font-medium text-gray-700">
                            First name
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div> */}

                        {/* <div class="col-span-6 sm:col-span-3">
                          <label htmlFor="last-name" class="block text-sm font-medium text-gray-700">
                            Last name
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div> */}

                        {/* <div class="col-span-6 sm:col-span-4">
                          <label htmlFor="email-address" class="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div> */}

                        {/* <div class="col-span-6 sm:col-span-3">
                          <label htmlFor="country" class="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            autoComplete="country-name"
                            class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div> */}

                        {/* <div class="col-span-6">
                          <label htmlFor="street-address" class="block text-sm font-medium text-gray-700">
                            Street address
                          </label>
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div> */}

                        {/* <div class="col-span-6">
                          <label htmlFor="street-address" class="block text-sm font-medium text-gray-700">
                            Street address
                          </label>
                          <input
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div> */}

                        {/* 
                          <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                            <label htmlFor="city" class="block text-sm font-medium text-gray-700">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div> 
                        */}



                        {/* - - - - - - - - - - - - - - - - - - - -  */}

                        <div 
                          ref={(elem) => validation_error_refs.current[0] = elem} 
                          class="col-span-6 sm:col-span-3 lg:col-span-2"
                          style={{
                            position: 'relative'
                          }}
                        >
                          <label htmlFor="create-product-price-field" class="block text-sm font-medium text-gray-700">
                            Price
                            <span class="text-gray-400">{' '}(required)</span>
                          </label>

                          <div className="relative mt-1 rounded-md shadow-sm">

                            <input
                              type="number" 
                              name="price" 
                              value={form.price}
                              onChange={formChangeHandler}
                              id="create-product-price-field"
                              // class={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                              class={`
                                ${form_validation_error['price'] 
                                  ? 
                                    'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm' 
                                  :
                                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                }`}
                            />

                            <div
                              id="error-icon" 
                              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                              style={{
                                opacity: 0,
                                transform: 'translateY(-4%)'
                              }}
                            >
                              <div className="h-5 w-5 text-red-500" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                              </div>
                            </div>

                          </div>

                          <p 
                            id="error-message"
                            className="mt-2 text-sm text-red-600"
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              transform: 'translateY(110%)',
                              opacity: 0,
                            }}
                          >
                            Price cannot be negative!
                          </p>

                        </div>

                        {/* - - - - - - - - - - - - - - - - - - - -  */}

                        <div 
                          ref={(elem) => validation_error_refs.current[1] = elem} 
                          class="col-span-6 sm:col-span-3 lg:col-span-2"
                          style={{
                            position: 'relative'
                          }}
                        >
                          <label htmlFor="create-product-stock-field" class="block text-sm font-medium text-gray-700">
                            Stock
                            <span class="text-gray-400">{' '}(required)</span>
                          </label>

                          <div className="relative mt-1 rounded-md shadow-sm">

                            <input
                              type="number" 
                              name="stock" 
                              value={form.stock}
                              onChange={formChangeHandler}
                              id="create-product-stock-field"
                              // class={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
                              class={`
                                ${form_validation_error['stock'] 
                                  ? 
                                    'block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm' 
                                  :
                                    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                }`}
                            />

                            <div
                              id="error-icon" 
                              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                              style={{
                                opacity: 0,
                                transform: 'translateY(-4%)'
                              }}
                            >
                              <div className="h-5 w-5 text-red-500" aria-hidden="true">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                              </div>
                            </div>

                          </div>

                          <p 
                            id="error-message"
                            className="mt-2 text-sm text-red-600"
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              transform: 'translateY(110%)',
                              opacity: 0,
                            }}
                          >
                            Stock cannot be negative!
                          </p>

                        </div>

                        {/* - - - - - - - - - - - - - - - - - - - -  */}

                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      disabled={!enable_form_submit}
                      onClick={() => {
                        submitFormHandler();
                        resetForm();
                        setOpened(false);
                      }}
                      type="submit"
                      class={`
                        inline-flex justify-center 
                        rounded-md border border-transparent 
                        bg-indigo-600 py-2 px-4 text-sm font-medium text-white 
                        shadow-sm 
                        ${ enable_form_submit === true  ? 'cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : '' }
                      `}
                      style={ enable_form_submit === true ? {} : { opacity: 0.2 }}
                      >
                        {modal_details['button_text']}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Divider: */}
            <div class="hidden sm:block" aria-hidden="true">
              <div class="py-5">
                <div class="border-t border-gray-200" />
              </div>
            </div>

            {/* Categorical Product Information Section: */}
            <div class="mt-10 sm:mt-0">
              <div class="md:grid md:grid-cols-3 md:gap-6">
                <div class="md:col-span-1">
                  <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Categorical Information</h3>
                    <p class="mt-1 text-sm text-gray-600">Choose how you want to categorize the product.</p>
                  </div>
                </div>
                <div class="mt-5 md:col-span-2 md:mt-0">

                  <div 
                    // class="overflow-hidden shadow sm:rounded-md"
                  >
                    <div class="bg-white px-4 py-5 sm:p-6">
                      <div 
                        style={{
                          // border: 'solid darkorange 6px',
                          gap: '1rem',
                        }}
                        class="

                          bg-white 
                          
                          grid
                          grid-cols-1 xl:grid-cols-2
                        "
                      >

                        <DropdownOptionsRadio form={form} formChangeHandler={formChangeHandler} options={categories} setOptions={setCategories} name='categories' label='Category' endpoint='/category' css_id='add-new-category-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={0}  />

                        <DropdownOptionsRadio form={form} formChangeHandler={formChangeHandler} options={tags} setOptions={setTags} name='tags' label='Tag' endpoint='/tag' css_id='add-new-tag-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={1}  />
                     
                        <DropdownOptionsRadio form={form} formChangeHandler={formChangeHandler} options={colors} setOptions={setColors} name='colors' label='Color' endpoint='/color' css_id='add-new-color-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={2}  />

                        <DropdownOptionsRadio form={form} formChangeHandler={formChangeHandler} options={sizes} setOptions={setSizes} name='sizes' label='Size' endpoint='/size' css_id='add-new-size-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={3}  />

                        <DropdownOptionsRadio form={form} formChangeHandler={formChangeHandler} options={departments} setOptions={setDepartments} name='departments' label='Department' endpoint='/department' css_id='add-new-department-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={4}  />

                      </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        disabled={!enable_form_submit}
                        onClick={() => {
                          submitFormHandler();
                          resetForm();
                          setOpened(false);
                        }}
                        type="submit"
                        class={`
                          inline-flex justify-center 
                          rounded-md border border-transparent 
                          bg-indigo-600 py-2 px-4 text-sm font-medium text-white 
                          shadow-sm 
                          ${ enable_form_submit === true  ? 'cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' : '' }
                        `}
                        style={ enable_form_submit === true ? {} : { opacity: 0.2 }}
                      >
                        {modal_details['button_text']}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* - - - - - - - - - - - - - - - - */}

          {/* Image Modal: */}

          <Modal
            opened={opened_image_modal}
            onClose={() => setOpenedImageModal(false)}
            // title="Introduce yourself!"
            transition="fade"
            transitionDuration={400}
            exitTransitionDuration={400}
            transitionTimingFunction="ease"
            overlayColor='black'
            overlayOpacity={0.7}
            // overlayBlur={3}
            // fullScreen={true}
            // closeOnClickOutside={false}
            size="80%"
          >

            <Images { ...{ formChangeHandler } } closeModal={ () => setOpenedImageModal(false) } />

          </Modal> {/* Image Modal */}

          {/* - - - - - - - - - - - - - - - - */}

        </div>
      </Modal> {/* Create Product Modal */}

      {/* ----------------------------------- */}
    </>
  );
};