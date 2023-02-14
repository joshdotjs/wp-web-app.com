const transition = (condition, classes_if, classes_else, ease='') => {
  // ex: 
  //  transition(panel === 1, 'translate-x-full', 'translate-x-0')
  //  transition(open, 'translate-x-0 opacity-100 scale-100','translate-x-0 transform opacity-0 scale-95', 'ease-in-out duration-300')
  return `${condition ? classes_if : classes_else} ${ease}`;
};

const transitionTextColor = (condition, classes_if, classes_else, ease='') => {
  // ex: 
  // class={
  //   `
  //     ${transitionTextColor(active_panel === idx, 'text-gray-900  bg-blue-500', 'text-gray-400  bg-red-500')}
  //   `
  // }
  return `
    transition  ease-in-out  duration-300
    ${condition ? classes_if : classes_else} 
  `;
};

export { transition, transitionTextColor };
