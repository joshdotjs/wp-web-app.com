import { useState, useEffect, useRef } from 'react'; 
import { useClickOutside } from '@mantine/hooks';
import { gsap } from 'gsap';

// ==============================================

export default function DropdownCheckbox({
  data,
  // data={[
  //   { value: 'react',  label: 'React' },
  //   { value: 'ng',     label: 'Angular' },
  //   { value: 'svelte', label: 'Svelte' },
  //   { value: 'vue',    label: 'Vue' },
  // ]}
  // value,
  // value={dropdown}
  onChange,
  // onChange={setDropdown}
}) {

  // -data is the input (in form above) from the categories endpoint.
  // -value is the the external state. it will be sent to the endpoint to filter the products on.
  //    --we don't need value inside this component.
  // -onChange is the sate update to update the external state to filter the products on.
  // -'state' is the internal state.  Just simpler to localize this state for the UI of this component.
  //    --when 'state' changes we will also update the external state and send a request to filter the products. 

  // --------------------------------------------
  
  const [state, setState] = useState({});

  useEffect(() => {
    // pre-populate all the properties in state to false (unchecked)
    let init_state = {};
    data.forEach((datum) => {
      init_state[datum.value] = false;
    });
    setState(init_state);
  }, [data]);

  
  // --------------------------------------------

  const onChangeHandler = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    console.log('e.target.name: ', name, '\te.target.checked: ', e.target.checked);
    setState((prev) => { 

      const updated_state = {...prev, [name]: checked};
      console.log('updated state: ', updated_state);


      // update the enternal state



      return updated_state;
    });
  };

  // --------------------------------------------

  const [open, setOpen] = useState(false);

  const refs = useRef([]);
  // const arrow_ref = useRef(null);
  const menu_ref = useRef(null);

  const [dropdown, setDropdown] = useState(null);
  const [menu, setMenu] = useState(null);
  useClickOutside(() => {
    open && (() => {
      console.log('%cclicked outside dropdown-select', 'color: darkorange');
      closeDropdown();
    })();
  }, null, [menu, dropdown]);

  // - - - - - - - - - - - - - - - - - - - - - 
  
  const openDropdown = () => {
    
    const menu = menu_ref.current;
    // const arrow = arrow_ref.current;
    const duration = 0.2;
    
    menu.style.display = 'block';

    gsap.fromTo(menu, {
      opacity: 0,
      scale: 0.75,
    },{
      opacity: 1,
      scale: 1,
      duration,
    });

    // gsap.to(arrow, {
    //   rotate: '180deg',
    //   duration,
    // });
    
    setOpen(true);
  }
        
  // - - - - - - - - - - - - - - - - - - - - - 
  
  const closeDropdown = () => {
    
    const menu = menu_ref.current;
    // const arrow = arrow_ref.current;
    const duration = 0.2;
    
    gsap.fromTo(menu, {
      opacity: 1,
      scale: 1,
    }, {
      opacity: 0,
      scale: 0.75,
      onComplete: () => menu.style.display = 'none',
      duration,
    });

    // gsap.to(arrow, {
    //   rotate: '0deg',
    //   duration,
    // });
    
    setOpen(false);
  }
  // - - - - - - - - - - - - - - - - - - - - - 
  
  const toggleDropdown = () => {
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  // --------------------------------------------

  return (
    <div>
      <label id="listbox-label" class="block text-sm font-medium text-gray-700">Label</label>
      <div class="relative mt-1">
        <button 
          ref={setDropdown}
          onClick={toggleDropdown} 
          type="button" 
          class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" 
          aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
        >
          <span class="block truncate">Tom Cook</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            {/* <!-- Heroicon name: mini/chevron-up-down --> */}
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
            </svg>
          </span>
        </button>

        <div 
          ref={menu_ref}
          class='hidden opacity-0'
          style={{ transform: 'scale(0.75)' }}
        >
          <ul
            ref={setMenu} 
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">

            <fieldset class="space-y-5">

              {/* - - - - - - - - - - - - - - - - - - - -  */}

              {data.map((datum, idx) => (
                <div
                  key={idx} // TODO
                  // ref={el => refs.current[idx] = el}
                  class="relative flex items-start px-4 py-2"
                >
                  <div class="flex h-5 items-center">
                    <input type="checkbox" 
                      name={datum.value} 
                      checked={state[datum.value]}
                      onChange={(e) => {
                        e.stopPropagation();
                        onChangeHandler(e);
                      }}
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="candidates" class="font-medium text-gray-700">{datum.label}</label>
                    {/* <p id="candidates-description" class="text-gray-500">Get notified when a candidate applies for a job.</p> */}
                  </div>
                </div>
              ))}

              {/* - - - - - - - - - - - - - - - - - - - -  */}

             </fieldset>

          </ul>
        </div>
      </div>
    </div>
  );
}