import { useState, useEffect, useRef } from 'react'; 
import { useClickOutside } from '@mantine/hooks';
import { gsap } from 'gsap';

// ==============================================

export default function DropdownSelect({
  data,
  // data={[
  //   { value: 'react', label: 'React' },
  //   { value: 'ng', label: 'Angular' },
  //   { value: 'svelte', label: 'Svelte' },
  //   { value: 'vue', label: 'Vue' },
  // ]}
  value,
  // value={dropdown}
  onChange,
  // onChange={setDropdown}
}) {

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

  const mouseOverHandler = (idx) => () => {
    const elem = refs.current[idx];
    gsap.fromTo(elem, {
      background: 'white'
    }, {
      background: '#F3F4F5',
      duration: 0.1,
    });
  };


  const mouseOutHandler = (idx) => () => {
    const elem = refs.current[idx];
    gsap.to(elem, {
      background: 'white',
      duration: 0.1,
    });
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

        {/* <!--
          Select popover, show/hide based on select state.

          Entering: ""
            From: ""
            To: ""
          Leaving: "transition ease-in duration-100"
            From: "opacity-100"
            To: "opacity-0"
        --> */}
        <div 
          ref={menu_ref}
          class='hidden opacity-0'
          style={{ transform: 'scale(0.75)' }}
        >
          <ul
            ref={setMenu} 
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
            {/* <!--
              Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
              
              Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
            --> */}

            {/* - - - - - - - - - - - - - - - - - - - -  */}

            {data.map((datum, idx) => (
              <li 
              ref={el => refs.current[idx] = el} 
              onClick={() => {
                onChange(datum.value);
                closeDropdown();
              }}
              onMouseOver={mouseOverHandler(idx)}
              onMouseOut={mouseOutHandler(idx)}
              class="text-gray-900 relative cursor-default select-none py-2 pl-4 pr-4" 
              id="listbox-option-0" 
              role="option"
              >

                <svg //  Heroicon name: mini/check
                  class="inline text-indigo-600 texth-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill={`${value === datum.value ? 'currentColor' : 'transparent'}`}
                  aria-hidden="true"
                  >
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                  

                <span class={`
                  ml-2 truncate
                  ${value === datum.value ? 'font-semibold' : 'font-normal'}
                `}>
                  {datum.label}
                </span>

              </li>
            ))}

            {/* - - - - - - - - - - - - - - - - - - - -  */}

          </ul>
        </div>
      </div>
    </div>
  );
}