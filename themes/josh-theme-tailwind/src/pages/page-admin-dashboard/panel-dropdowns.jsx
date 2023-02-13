import { useState, useEffect } from 'react';

import { RangeSlider, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { Select } from '@mantine/core';

import Dropdown from '../../comps/dropdown/dropdown';
import DropdownWithDivider from '../../comps/dropdown-divide/dropdown-divide';
import DropdownWithDividerWithIcons from '../../comps/dropdown-divide-icons/dropdown-divide-icons';
import DropdownSelect from '../../comps/dropdown-select/dropdown-select';
import DropdownCheckbox from '../../comps/dropdown-checkbox/dropdown-checkbox';

import { lc, lg, lo, lp, lb, lr, ly, log } from '../../util/log';
import { getLS, setLS } from '../../util/local-storage';
import { fireEvent } from '../../util/custom-event';
import { fetchGET, fetchPOST } from '../../util/fetch';

// ==============================================

export default function PanelDropdowns({panel_refs}) {

  // --------------------------------------------
  
  // Note that Select value should always be either string or null:
  // const [value, setValue] = useState<string | null>(null);
  const [dropdown, setDropdown] = useState(null);
  // useEffect(() => {
  //   console.log('dropdown: ', dropdown);
  // }, [dropdown]);

  // --------------------------------------------
  
  // Note that Select value should always be either string or null:
  // const [value, setValue] = useState<string | null>(null);
  const [dropdown_select, setDropdownSelect] = useState(null);
  // useEffect(() => {
  //   console.log('dropdown_select: ', dropdown_select);
  // }, [dropdown_select]);

  // --------------------------------------------

  const money_max = 500;
  const money_min = 0;
  const [filter_money, setFilterMoney] = useState([money_min, money_max]);
  const [debounced_filter_money] = useDebouncedValue(filter_money, 200);




  // --------------------------------------------

  return (
    <div 
      id="panel-5-DEBUG" 
      ref={(el) => panel_refs.current[4] = el} 
      class="mt-8 mb-8 border border-sky-500 w-full" 
      style={{
        border: 'dashed hotpink 5px', 
        // position: 'absolute', zIndex: 0, opacity: 0}}
        position: 'absolute', 
        zIndex: 0, 
        opacity: 0,
        display: 'none'
      }}
    >

      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex justify-between mb-8">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Products</h1>
            <p class="mt-2 text-sm text-gray-700">Below are all the products. Filter by altering the input fields below.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button 
              type="button" 
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              style={{width: '115px'}}
            >Add Product</button>
          </div>
        </div>



        <div class="flex border border-gray-900 justify-evenly">

          
          <div  // range slider
            style={{
              // border: 'solid green 2px',
              marginTop: '1rem',
              width: '200px',
            }}
          >
            {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
            <Text>Price</Text>
            <RangeSlider
              min={money_min}
              max={money_max}
              onChange={setFilterMoney}
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


          <div  // dropdown
            style={{
              // border: 'solid green 2px',
              marginTop: '1rem',

            }}
          >
            {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
            <Text>Dropdown</Text>
            <Dropdown 
              placeholder="Pick one"
              value={dropdown}
              onChange={setDropdown}
              data={[
                { value: 'react', label: 'React' },
                { value: 'ng', label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue', label: 'Vue' },
              ]}
            />

          </div>


          <div // dropdown w. divider
            style={{
              // border: 'solid green 2px',
              marginTop: '1rem',
            }}
          >
            {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
            <Text>Dropdown w. Divider</Text>
            <DropdownWithDivider 
              placeholder="Pick one"
              value={dropdown}
              onChange={setDropdown}
              data={[
                [
                  { value: 'Edit',             label: 'Edit'      },
                  { value: 'Duplicate',        label: 'Duplicate' },
                ], 
                [
                  { value: 'Archive',          label: 'Archive', },
                  { value: 'Move',             label: 'Move',    },
                  { value: 'Josh',             label: 'Josh',    },
                ], 
                [
                  { value: 'Share',            label: 'Share',              },
                  { value: 'Add to favorites', label: 'Add to favorites',   },
                ], 
                [
                  { value: 'Delete',           label: 'Delete',  },
                ],

              ]}
            />
          </div>

          <div // dropdown w. divider
            style={{
              // border: 'solid green 2px',
              marginTop: '1rem',
            }}
          >
            {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
            <Text>Dropdown w. Divider & Icons</Text>
            <DropdownWithDividerWithIcons 
              placeholder="Pick one"
              value={dropdown}
              onChange={setDropdown}
              data={[
                [
                  { 
                    value: 'a',             
                    label: 'A',
                    svg_paths:
                      <>  
                        {/* Heroicon name: mini/pencil-square */}
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                      </>,
                  },
                  { 
                    value: 'b',             
                    label: 'B',
                    svg_paths:
                      <>  
                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                      </>,
                  },
                ], 
                [
                  { 
                    value: 'c',             
                    label: 'C',
                    svg_paths:
                      <>  
                        <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
                        <path fill-rule="evenodd" d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zM7 11a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clip-rule="evenodd" />
                      </>,
                  },
                  { 
                    value: 'd',             
                    label: 'D',
                    svg_paths:
                      <>  
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z" clip-rule="evenodd" />
                      </>,
                  },
                  { 
                    value: 'e',             
                    label: 'E',
                    svg_paths:
                      <>  
                        <path d ="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
                      </>,
                  },
                ], 
                [
                  { 
                    value: 'f',             
                    label: 'F',
                    svg_paths:
                      <>  
                        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                      </>,
                  },
                ], 
              ]}
            />
          </div>


          <div // dropdown (checkboxes)
            style={{
              border: 'solid green 2px',
              marginTop: '1rem',
            }}
          >
            <h5 class="text-md font-semibold text-gray-900">Filters</h5>
            <Text>Dropdown (Checkboxes)</Text>
            <DropdownCheckbox
              placeholder="Pick one"
              value={dropdown}
              onChange={setDropdown}
              data={[
                { value: 'react',  label: 'React' },
                { value: 'ng',     label: 'Angular' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'vue',    label: 'Vue' },
              ]}
            />
          </div>

        </div>


        <hr style={{ marginTop: '1rem' }} />


        <div // dropdown (select)
          style={{
            // border: 'solid green 2px',
            marginTop: '1rem',
            width: '200px',
          }}
        >
          {/* <h1 class="text-xl font-semibold text-gray-900">Filters</h1> */}
          <Text>Dropdown Select</Text>
          <DropdownSelect 
            placeholder="Pick one"
            value={dropdown}
            onChange={setDropdown}
            data={[
              { value: 'react',  label: 'React' },
              { value: 'ng',     label: 'Angular' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'vue',    label: 'Vue' },
            ]}
          />

        </div>











      </div>



    </div>
  );
}