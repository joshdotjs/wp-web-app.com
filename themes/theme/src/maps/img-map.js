const img_map = {
  'men': {
    'shoes': { title: 'Vaporfly 2', img: '/img/products/shoes/men/Vaporfly-2-1.webp' },
    'clothes': { title: 'Cargo Pants', img: '/img/products/clothes/men/cargo-pants-green.webp' },
    'accessories': { title: 'Backpack', img: '/img/products/accessories/men/backpack.webp' }, // hats / glasses / bags
    'equipment': { title: 'TODO', img: '/img/products/clothes/men/Dri-FIT-DNA-shorts-blue.webp' }, // workout gear,  men: balls, women: yoga-mats,  (Nike: accessories -> gear by sport)
  },
  'women': {
    'shoes': { title: 'Infinity React 3', img: '/img/products/shoes/women/Infinity-React-3-white.webp' },
    'clothes': { title: 'Dri Fit One', img: '/img/products/clothes/women/Dri-FIT-One-blue.webp' },
    'accessories': { title: 'Nike Swoosh Green', img: '/img/products/clothes/women/Nike-Swoosh-green.webp' }, 
    'equipment': { title: 'Nike Swoosh Green', img: '/img/products/clothes/women/Nike-Swoosh-green.webp'  }, 
  },
  'new': {
    'shoes': { title: 'Infinity React 3', img: '/img/products/shoes/women/Infinity-React-3-white.webp' },
    'clothes': { title: 'Dri Fit One', img: '/img/products/clothes/women/Dri-FIT-One-blue.webp' },
    'accessories': { title: 'Nike Swoosh Green', img: '/img/products/clothes/women/Nike-Swoosh-green.webp' }, 
    'equipment': { title: 'Nike Swoosh Green', img: '/img/products/clothes/women/Nike-Swoosh-green.webp'  }, 
  },
  'sale': {
    'shoes': { title: 'Infinity React 3', img: '/img/products/shoes/women/Infinity-React-3-white.webp' },
    'clothes': { title: 'Dri Fit One', img: '/img/products/clothes/women/Dri-FIT-One-blue.webp' },
    'accessories': { title: 'Nike Swoosh Green', img: '/img/products/clothes/women/Nike-Swoosh-green.webp' }, 
    'equipment': { title: 'Nike Swoosh Green', img: '/img/products/clothes/women/Nike-Swoosh-green.webp'  }, 
  },
};

// ==============================================

// const imgMappingKey2Index = ({ category, gender }) => {
//   const idx = ['new', 'men', 'women', 'sale'].indexOf(category);
//   const jdx = ['shoes', 'clothes', 'accessories', 'equipment'].indexOf(gender);
//   return { idx, jdx };
// };

// ==============================================

// const imgMappingIndex2key = ({ idx, jdx }) => {
//   const category = ['new', 'men', 'women', 'sale'][jdx];
//   const gender = ['shoes', 'clothes', 'accessories', 'equipment'][idx];
//   return { category, gender };
// };

// ==============================================

export { img_map };