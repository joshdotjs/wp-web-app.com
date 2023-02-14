const listen = ({selector, event='click', callback, options={ capture: false }, elem=null}) => {
  // -Add event listener.
  // -Query for the element via querySelector if selector is provided.
  // -Else, use reference to elem passed in.

  if (elem) {
    elem.addEventListener(event, callback, options);
    return () => elem.removeEventListener(event, callback, options);
  } else { // -query for the element
    const element = qs(selector);
    element.addEventListener(event, callback, options);
    return () => element.removeEventListener(event, callback, options);
  }

};

// ==============================================

const listenAll = ({selector, event='click', callback, options={ capture: false }}) => {
  const elems = qsAll(selector);
  console.log('elems: ', elems);
  elems.forEach((elem) => {
    elem.addEventListener(event, callback, options);
  });
  return () => {
    elems.forEach((elem) => {
      elem.removeEventListener(event, callback, options);
    });
  };
};

// ==============================================

const resetElement = (elem) => elem.textContent = '';

const createElement = (str) => document.createElement(str);

// ==============================================

const qs    = (selector) => document.querySelector(selector);
const qsAll = (selector) => document.querySelectorAll(selector);

// ==============================================

const disableClickCallback = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

// ==============================================

const disableClick = () => {
  document.querySelector('body').style.pointerEvents = 'none'; // disable even hover events -- WAIT, THIS DOESN'T CAPTURE EVENTS => only applies directly to body, yes?
  document.addEventListener('click', disableClickCallback, true);
}

// ==============================================

const enableClick = () => {
  document.querySelector('body').style.pointerEvents = 'auto';
  document.removeEventListener('click', disableClickCallback, true);
}

// ==============================================

export { 
  listen, listenAll,
  qs, qsAll,
  createElement, resetElement,  
  disableClick, enableClick,
 };