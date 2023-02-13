import logo from '../../img/logo.svg';

// ==============================================

export default function DesktopSidebar({ panel, changePanel }) {


  const transition = (condition, classes_if, classes_else) => {
    // ex: transition(panel === 1, 'translate-x-full', 'translate-x-0')
    return `${condition ? classes_if : classes_else} ease-in-out duration-300`;
  };


  return (
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
      <div class="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
        <div class="flex flex-shrink-0 items-center px-4">

          <a 
            // href='/'
            href={`${PHP.site_url}/`}
          >
            <img class="h-8 w-auto" src={logo} alt="Logo" />
          </a>
        </div>
        <nav class="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
          <div class="space-y-1 px-2">
            {/* <!-- Current: "bg-cyan-800 text-white", Default: "text-cyan-100 hover:text-white hover:bg-cyan-600" --> */}

              <a 
                onClick={changePanel(0)} 
                href="" 
                class={`
                  text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md
                  ${transition(panel === 0, 'bg-cyan-800', '')}
                `}
              >
                {/* <!-- Heroicon name: outline/scale --> */}
                {/* <svg class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg> */}
                <svg className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Orders
              </a>
  
            <a href="" 
              onClick={changePanel(1)}
              class={`
                text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md
                ${transition(panel === 1, 'bg-cyan-800', '')}
              `}
            >
              {/* <!-- Heroicon name: outline/clock --> */}
              {/* <svg class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg> */}
              <svg className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Products
            </a>
  

            <a href="" 
              onClick={changePanel(2)}
              class={`
                text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md
                ${transition(panel === 2, 'bg-cyan-800', '')}
              `}
                aria-current="page">
              {/* <!-- Heroicon name: outline/home --> */}
              {/* <svg class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg> */}


              <svg className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

              Account
            </a>
  
  
            <a 
              onClick={changePanel(3)} 
              href="" 
              class={`
                text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md
                ${transition(panel === 3, 'bg-cyan-800', '')}
              `}
            >
              {/* <!-- Heroicon name: outline/user-group --> */}
              <svg class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              Users
            </a>
  
            <a 
              onClick={changePanel(4)} 
              href="" 
              class={`
                text-white group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md
                ${transition(panel === 4, 'bg-cyan-800', '')}
              `}
            >
              {/* <!-- Heroicon name: outline/document-chart-bar --> */}
              <svg class="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              {/* Reports */}
              Dropdowns
            </a>
          </div>

          <div class="mt-6 pt-6">
            <div class="space-y-1 px-2">
              <a href="#" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
                {/* <!-- Heroicon name: outline/cog --> */}
                <svg class="mr-4 h-6 w-6 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
                Settings
              </a>
  
              <a href="#" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
                {/* <!-- Heroicon name: outline/question-mark-circle --> */}
                <svg class="mr-4 h-6 w-6 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                Help
              </a>
  
              <a href="#" class="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white">
                {/* <!-- Heroicon name: outline/shield-check --> */}
                <svg class="mr-4 h-6 w-6 text-cyan-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Privacy
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}