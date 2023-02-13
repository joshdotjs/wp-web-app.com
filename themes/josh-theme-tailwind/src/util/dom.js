const disableClickCallback = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

// ==============================================

const disableClick = () => {
  document.addEventListener('click', disableClickCallback, true);
}

// ==============================================

const enableClick = () => {
  document.removeEventListener('click', disableClickCallback, true);
}

// ==============================================

export { disableClick, enableClick };