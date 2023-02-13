import { useState, useEffect } from 'react';

import { RangeSlider, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import DropdownOptions from './dropdown-options-checkbox';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../../util/log';
// import { getLS, setLS } from '../../../util/local-storage';
// import { fireEvent } from '../../../util/custom-event';
import { fetchGET, fetchPOST } from '../../../util/fetch';


// ==============================================


// ==============================================

export default function Filters({ 
    categories, setCategories,
    tags, setTags,
    colors, setColors,
    sizes, setSizes,
    departments, setDepartments,
    updateProducts,
    num_filtered_products,
    filters, setFilters,
    money_max, money_min,
    stock_max, stock_min,
    
  }) {

  // --------------------------------------------

  const [active_dropdown_idx, setActiveDropdownIdx] = useState(-1); // used to set the z-index high on the active dropdown

  const [ num_active_filters, setNumActiveFilters ] = useState(0);

  // --------------------------------------------

  const filterChangeHandler = ({ target }) => {

    // - - - - - - - - - - - - - - - - - - - - - 

    const {name, value, type, checked} = target;
 
    // console.log('name: ', name);
    // console.log('value: ', value);
    // console.log('checked: ', checked);
    // console.log('type: ', type);

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
    
    if (type === 'slider') {
      
      const { min, max } = target;
      // console.log('updating slider for money, max: ', max, '\tmin: ', min);
      setFilters(prev => {
        const new_filters = { ...prev, [name]: { max, min } };
        updateProducts({ curr_filters: new_filters });
        updateNumActiveFilters(new_filters);
        return new_filters;
      });
    }

    // - - - - - - - - - - - - - - - - - - - - - 

    const updateNumActiveFilters = (curr_filters) => {
      let new_num_active_filters = 0;
      for (let key of ['categories', 'tags', 'colors', 'sizes', 'departments'])
        new_num_active_filters += curr_filters[key].size;

      if (curr_filters.price.max !== money_max || curr_filters.price.min !== money_min)
        ++new_num_active_filters;

      setNumActiveFilters(new_num_active_filters);
    };

    // - - - - - - - - - - - - - - - - - - - - - 
    
  };

  // --------------------------------------------

  const [filter_money, setFilterMoney] = useState([money_min, money_max]);
  const [debounced_filter_money] = useDebouncedValue(filter_money, 200);

  const filterMoneyHandler = (vals) => {
    const [min, max]= vals;
    setFilterMoney(vals);
  };

  useEffect(() => {
    // console.log('debounced_filter_money: ', debounced_filter_money);
    const [min, max]= debounced_filter_money;
    filterChangeHandler({ target: { type: 'slider', name: 'price', max, min }});
  }, [debounced_filter_money]);
  
  // --------------------------------------------

  const [filter_stock, setFilterStock] = useState([stock_min, stock_max]);
  const [debounced_filter_stock] = useDebouncedValue(filter_stock, 200);

  const filterStockHandler = (vals) => {
    const [min, max]= vals;
    setFilterStock(vals);
  };

  useEffect(() => {
    // console.log('debounced_filter_stock: ', debounced_filter_stock);
    const [min, max]= debounced_filter_stock;
    filterChangeHandler({ target: { type: 'slider', name: 'stock', max, min }});
  }, [debounced_filter_stock]);
  
  // --------------------------------------------


  return (
    // <div class="flex border border-gray-900 justify-evenly">
    <div 
      class="
        grid 
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        border border-gray-900
      "
      style={{
        gap: '0.5rem'
      }}
    >
        

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <div  // range sliders
        style={{
          // border: 'solid green 2px',
          marginTop: '1rem',
          // width: '200px',
        }}
        >

        <div // range slider - Price   
        >
          {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
          <Text>Price</Text>
          <RangeSlider
            min={money_min}
            max={money_max}
            onChange={filterMoneyHandler}
            value={filter_money}
            onBlur={() => console.log('blur')}
            // onSelect={() => console.log('select')}
            onMouseUp={() => console.log('mouse up')}
            onMouseDown={() => console.log('mouse down')}
            // marks={[
              //   { value: 20, label: '$1' },
              //   // { value: 50, label: '50%' },
              //   { value: 80, label: '$500' },
              // ]}
              // labelTransition="skew-down"
              // labelTransitionDuration={150}
              // labelTransitionTimingFunction="ease"
          />
        </div>

        <div  // range slider - Stock
          class="mt-4"
        >
          {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
          <Text>Stock</Text>
          <RangeSlider
            min={stock_min}
            max={stock_max}
            onChange={filterStockHandler}
            value={filter_stock}
            onBlur={() => console.log('blur')}
            // onSelect={() => console.log('select')}
            onMouseUp={() => console.log('mouse up')}
            onMouseDown={() => console.log('mouse down')}
            // marks={[
              //   { value: 20, label: '$1' },
              //   // { value: 50, label: '50%' },
              //   { value: 80, label: '$500' },
              // ]}
              // labelTransition="skew-down"
              // labelTransitionDuration={150}
              // labelTransitionTimingFunction="ease"
          />
        </div>
  
      </div>

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <DropdownOptions radio={false} form={filters} formChangeHandler={filterChangeHandler} options={categories} setOptions={setCategories} name='categories' label='Category' endpoint='/category' css_id='filter-category-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={0}  />

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <DropdownOptions radio={false} form={filters} formChangeHandler={filterChangeHandler} options={tags} setOptions={setTags} name='tags' label='Tag' endpoint='/tag' css_id='filter-tag-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={1}  />

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <DropdownOptions radio={false} form={filters} formChangeHandler={filterChangeHandler} options={colors} setOptions={setColors} name='colors' label='Color' endpoint='/color' css_id='filter-color-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={2}  />

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <DropdownOptions radio={false} form={filters} formChangeHandler={filterChangeHandler} options={sizes} setOptions={setSizes} name='sizes' label='Size' endpoint='/size' css_id='filter-size-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={3}  />

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <DropdownOptions radio={false} form={filters} formChangeHandler={filterChangeHandler} options={departments} setOptions={setDepartments} name='departments' label='Department' endpoint='/department' css_id='filter-department-input-field'  setActiveDropdownIdx={setActiveDropdownIdx}  active_dropdown_idx={active_dropdown_idx}  dropdown_number={4}  />

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}

      <div>Number of filtered products: {num_filtered_products}</div>

      {/* - - - - - - - - - - - - - - - - - - - - - - - */}
  
      <div>Number of filters applied: {num_active_filters}</div>

    </div>
  
  );
    
};