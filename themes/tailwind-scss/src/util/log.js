// Debugging:
const lc = (x) => { console.log('%c' + x, 'color: cyan'); };
const lg = (x) => { console.log('%c' + x, 'color: lightgreen'); };
const lo = (x) => { console.log('%c' + x, 'color: darkorange'); };
const lp = (x) => { console.log('%c' + x, 'color: hotpink'); };
const lb = (x) => { console.log('%c' + x, 'color: deepskyblue'); };
const lr = (x) => { console.log('%c' + x, 'color: red'); };
const ly = (x) => { console.log('%c' + x, 'color: yellow'); };

// ==============================================

const log = (x, color, title='') => {
  console.log(
    `%c ${title}:
    ${JSON.stringify(x, undefined, 2)}`, 
    `
      color: ${color}; 
      background: black;
    `
  );
};

// ==============================================

export { lc, lg, lo, lp, lb, lr, ly, log};