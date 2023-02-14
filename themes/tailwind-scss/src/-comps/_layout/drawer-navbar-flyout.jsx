import React, { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, useContext } from 'react';
// import { createPortal } from 'react-dom';
import { gsap } from "gsap";

import { transitionTextColor } from '@/util/transition';
import { lc, lg, lo, lp, lb, lr, ly } from '@/util/log';
import { disableClick, enableClick } from '@/util/dom';

import { img_map } from '@/maps/img-map';
import { setLS } from '@/util/local-storage';

// ==============================================

let openDrawer, closeDrawer;

const navbar_top_height    = '50px';
const navbar_bottom_height = '70px';
const header_height        = '120px';
const flyout_height        = '300px';
const flyout_height_minus_translation = `${300 - 120}px`; // flyout - header

// ==============================================

const Card = ({ jdx, title, img, classes, onHover, offHover, active_hovered, category, gender, tag }) => (
  <a 
    href="/store"
    className={`
      cursor-pointer
      ${classes}
    `}
    onMouseEnter={() => onHover(jdx)}
    onMouseLeave={offHover}
    onClick={() => {
      setLS('filters', { category, gender, tag });
    }}
  >
    <img src={img} className={`rounded-md overflow-hidden mb-4 w-full ${active_hovered === jdx ? 'opacity-80' : 'opacity-100'}`}  />
    <h5 className={`text-sm font-medium ${active_hovered === jdx ? 'text-indigo-600' : 'text-gray-900'}`}>{title}</h5>
    <p className="text-sm text-gray-500">Shop now</p>
  </a>
);

// ==============================================

const Panel = ({ idx, panel_refs, imgs, gender, tag }) => {

  // --------------------------------------------

  const [active_hovered, setActiveHovered] = useState();

  // --------------------------------------------

  const onHover = (jdx) => {

    console.log('idx: ', idx, '\tjdx: ', jdx);

    setActiveHovered(jdx);
  };

  // --------------------------------------------

  const offHover = () => {
    setActiveHovered(null);
  };

  // --------------------------------------------

  return (
    <div 
      ref={el => panel_refs.current[idx] = el}
      className="absolute  left-0  top-0"
      style={{ 
        opacity: 0, 
        display: 'none',
        left: '50%',
        top: '41.5%',
        transform: 'translateX(-50%) translateY(-50%)',
        height: flyout_height_minus_translation,
        gridTemplateColumns: 'repeat(4, 180px)',
        gap: '1rem',
      }}
    >
      <Card jdx={0} title="Shoes"       category="shoes"       classes="" img={imgs['shoes'].img}       {...{onHover, offHover, active_hovered, gender, tag}} />
      <Card jdx={1} title="Clothes"     category="clothes"     classes="" img={imgs['clothes'].img}     {...{onHover, offHover, active_hovered, gender, tag}} />
      <Card jdx={2} title="Accessories" category="accessories" classes="" img={imgs['accessories'].img} {...{onHover, offHover, active_hovered, gender, tag}} />
      <Card jdx={3} title="Equipment"   category="equipment"   classes="" img={imgs['equipment'].img}   {...{onHover, offHover, active_hovered, gender, tag}} />
    </div>
  );
};

// ==============================================

const DrawerContents = ({ panel_refs, active_panel }) => {

  return (
    <div style={{
      // border: 'dashed hotpink 2px',
      height: '100%',
      position: 'relative',
    }}>
      <Panel idx={0} imgs={img_map['new']}   gender="all"   tag="new"  {...{panel_refs, active_panel}} />
      <Panel idx={1} imgs={img_map['men']}   gender="men"   tag="all"  {...{panel_refs, active_panel}} />
      <Panel idx={2} imgs={img_map['women']} gender="women" tag="all"  {...{panel_refs, active_panel}} />
      <Panel idx={3} imgs={img_map['sale']}  gender="all"   tag="sale" {...{panel_refs, active_panel}} />
    </div>
  );
};

// ==============================================

export default function NavbarFlyoutDrawer({ active_panel, setActivePanel, drawer_open, setDrawerOpen }) {

  // --------------------------------------------

  // -used to not open twice if already open and user clicks another navlink
  const panel_refs = useRef([]);

  // --------------------------------------------

  const changePanel = (idx) => {

    disableClick();
    setActivePanel(idx);

    const duration = 0.2;

    panel_refs.current.forEach((ref, i) => {
      if (i !== idx) { // place all other panels in back
        gsap.to(ref, { 
          opacity: 0, 
          onStart: () => ref.style.display = 'none',
          duration,
        });
      }
    });

    const ref = panel_refs.current[idx];
    gsap.to(ref, { // bring current panel to front
      opacity: 1,
      onStart: () => ref.style.display = 'grid',
      onComplete: () => {
        enableClick();
      },
      duration,
    });

  };

  // --------------------------------------------

  openDrawer = (idx) => {

    console.log('openDrawer()');

    // if (active_panel !== idx) // Panel other than currently active panel clicked => set active_panel = idx
    changePanel(idx);

    if (!drawer_open) { // drawer is not open => open it

      setDrawerOpen(true);
      showOverlay();   
    
      if (tl_ref.current) // if still open then reset timeline before opening.
        tl_ref.current.revert();
      
      const container = container_ref?.current;
      const container_container = container.parentNode;
      container_container.style.display = 'block';
  
      tl_ref.current = gsap.to(container, { 
        y: 0,
        duration: 0.2,
        onReverseComplete: () => container_container.style.display = 'none',
      });
    }
  };

  // --------------------------------------------

  closeDrawer = () => {
    setDrawerOpen(false);
    hideOverlay();
    tl_ref.current?.reverse();
  };

  // --------------------------------------------

  const tl_ref = useRef(null);
  const container_ref = useRef(null);
  const q = gsap.utils.selector(container_ref); // Returns a selector function that's scoped to a particular Element, meaning it'll only find descendants of that Element .

  // --------------------------------------------

  // const { overlay_ref } = useContext(CartContext);
  const overlay_ref = useRef(null);

  // --------------------------------------------
  
  const showOverlay = () => {
    lr('opening cart drawer');
    const ref = overlay_ref.current;
    ref.style.display = 'block';
    gsap.to(ref, { 
      opacity: 1, 
      duration: 0.3,
      onStart: () => {
        document.body.style.overflow = "hidden"; // don't scroll stuff underneath the modal
      },
    });
  };

  // --------------------------------------------

  const hideOverlay = () => {
    // fireEvent('cart-close');
    // setDrawerCartOpen(false);
    const ref = overlay_ref.current;
    gsap.to(ref, { 
      opacity: 0,
       duration: 0.3, 
       onComplete: () => {
        ref.style.display = 'none';
        document.body.style.overflow = "overlay"; // custom scrollbar overlay
      }});
  };

  // --------------------------------------------

  const translate = {
    // top: 0,
    transform: `translateY(-${flyout_height})`,
    // --navbar-top-height: 50px;
    // --navbar-bottom-height: 70px;
  };

  // --------------------------------------------
  
  return ( // createPortal(
    <div 
      className="hidden md:block"
      style={{ position: 'absolute',
        // border: 'dashed hotpink 1px',
        height: flyout_height,
        width: '100vw',
        // top: '200px',
        top: header_height,
        overflow: 'hidden',
        display: 'none',
      }}
    >
      <div // Blur Overlay
        ref={overlay_ref}
        className="pointer-events-auto fixed inset-0"
        style={{ 
          display: 'none',
          opacity: 0,     
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          // zIndex: '99'
          top: header_height,
        }}
        onClick={() => closeDrawer()}
      >  
      </div>

      <aside 
        ref={container_ref}
        style={{ 
          background: 'white',
          height: flyout_height,
          width: '100vw',
          padding: 0,
          margin: 0,
          ...translate,
        }}
        className="hidden md:block"
      >

        {/* - - - - - - - - - - - - - - - - - - */}

        <DrawerContents {...{active_panel, panel_refs}} />

        {/* - - - - - - - - - - - - - - - - - - */}

      </aside>


    </div>
    // ,
    // portal_root
  );

  // --------------------------------------------
};

// ==============================================

export { openDrawer, closeDrawer }; // NOTE: Need to pass these in as props like: () => openDrawer(); not as pointers like: openDrawer;