import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import MobileSidebarDrawer from './sidebar-mobile';
import DesktopSidebar from './sidebar-desktop';

import Panels from './main-panels';
import SearchBar from './search-bar';
import PageHeader from './main-header';

// import { fireEvent } from '../../util/custom-event';
// import { fetchPOST } from '../../util/fetch';
// import { log, lo } from '../../util/log';

// ==============================================

export default function PageAdminDashboard() {

  // --------------------------------------------

  const [show_dropdown, setShowDropdown] = useState(false);
  // const showDropdown = () => setShowDropdown(true);
  // const hideDropdown = () => setShowDropdown(false);
  const toggleDropdown = () => setShowDropdown(prev => !prev);

  // --------------------------------------------

  const [show_mobile_menu, setShowMobileMenu] = useState(false);
  // const showMobileMenu = () => setShowMobileMenu(true);
  const hideMobileMenu = () => setShowMobileMenu(false);
  const toggleMobileMenu = () => setShowMobileMenu(prev => !prev);

  // --------------------------------------------

  const [panel, setPanel] = useState(0);

  const panel_refs = useRef([]);

  const changePanel = (idx) => (e) => {
    e.preventDefault();
    setPanel(idx);
    
    // Step 1: Animate out all panels other than the one clicked
    const panels = panel_refs.current;
    panels.forEach((panel, i) => {
      if (i !== idx)
       gsap.to(panel, { opacity: 0 });
    });

    // Step 2: Bring clicked panel to front
    const target = panel_refs.current[idx];
    target.style.zIndex = 1;
    target.style.display = 'block';

    // Step 3: Animate in cliked panel and send others to back.
    gsap.to(target, { 
      opacity: 1, 
      onComplete: () => {
        panels.forEach((panel, i) => {
          if (i !== idx) {
            panel.style.zIndex = 0;
            panel.style.display = 'none';
          }
        });
 
      } 
    });
  };

  // --------------------------------------------

  return (
    <>
      <div class="min-h-full">

        {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
        <MobileSidebarDrawer { ...{ show_mobile_menu, hideMobileMenu } }/>

        {/* <!-- Static sidebar for desktop --> */}
        <DesktopSidebar { ...{ panel, changePanel } }/>

        <div class="flex flex-1 flex-col lg:pl-64">

          <SearchBar { ...{ show_dropdown, toggleDropdown, toggleMobileMenu } } />
          
          <main class="flex-1 pb-8">

            <PageHeader />
      
            <Panels { ...{ panel, panel_refs } } />

          </main>
        </div>
      </div>

    </>
  );
}