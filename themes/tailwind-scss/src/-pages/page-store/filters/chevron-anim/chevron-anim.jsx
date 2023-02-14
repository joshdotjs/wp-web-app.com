import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';

// import ChevronDownSVG from '@/comps/svg/chevron-down';
import ChevronDownSVG from 'comps/svg/chevron-down';

import './chevron-anim.scss';

// ==============================================

export default function ChevronAnim({children, title, num, set, classes}) {

  // --------------------------------------------
  
  const [is_up, setIsUp] = useState(true);

  const ref = useRef(null);
  const tl = useRef();
  const square = useRef(null);
  
  // --------------------------------------------

  const up = 'chevron-anim__title__arrow-up';

  // --------------------------------------------

  const open = () => {
    if (tl.current)
      tl.current.revert();

    const duration = 0.3;

    const timeline = gsap.timeline();
    timeline.to(square.current, { opacity: 0, duration });
    
    tl.current = timeline.to(ref.current, { height: '40px', duration }, '<=');
  };

  // --------------------------------------------

  const close = () => {
    tl.current?.reverse();
  };

  // --------------------------------------------

  const handler = () => {
    setIsUp((is_up) => {
      if (is_up) {
        open();
      } else {
        close();
      }
      return !is_up;
    });
  };

  // --------------------------------------------

  // useEffect(() => {
  //   setTimeout(() => {
  //     handler();
  //   }, 1e3);
  // }, []);

  // --------------------------------------------

  return (
    <div 
      ref={ref}
      className={`chevron-anim
        ${classes}
      `}
    >
      <div 
        className="chevron-anim__title"
        onClick={handler}
        // style={{ marginTop: '1.5rem' }}
      >
        <h5 
          // style={{ marginTop: '1rem' }}
        >
          {title} {' '} {num > 0 ? `(${num})` : ''}
        </h5>
        <ChevronDownSVG classes={`chevron-anim__title__arrow ${is_up ? up : ''}`} />
      </div>

      <div ref={square}
      >
        {children}
      </div>

    </div>
  );
}