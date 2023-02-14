import men_shoes from '/img/products/shoes/men/Vaporfly-2-1.webp';
import men_clothes from '/img/products/clothes/men/cargo-pants-green.webp';
import men_accessories from '/img/products/accessories/men/backpack.webp';
import men_equipment from '/img/products/clothes/men/Dri-FIT-DNA-shorts-blue.webp';

import women_shoes       from '/img/products/shoes/men/Vaporfly-2-1.webp';
import women_clothes     from '/img/products/clothes/men/cargo-pants-green.webp';
import women_accessories from '/img/products/accessories/men/backpack.webp';
import women_equipment   from '/img/products/clothes/men/Dri-FIT-DNA-shorts-blue.webp';

// ==============================================

const img_map = {
  'men': {
    'shoes': { title: 'Vaporfly 2',     img: men_shoes },
    'clothes': { title: 'Cargo Pants',  img: men_clothes },
    'accessories': { title: 'Backpack', img: men_accessories },
    'equipment': { title: 'TODO',       img: men_equipment }, // workout gear,  men: balls, women: yoga-mats,  (Nike: accessories -> gear by sport)
  },
  'women': {
    'shoes': { title: 'Infinity React 3',        img: women_shoes },
    'clothes': { title: 'Dri Fit One',           img: women_clothes },
    'accessories': { title: 'Nike Swoosh Green', img: women_accessories }, 
    'equipment': { title: 'Nike Swoosh Green',   img: women_equipment }, 
  },
  'new': {
    'shoes': { title: 'Infinity React 3',        img: women_shoes },
    'clothes': { title: 'Dri Fit One',           img: women_clothes },
    'accessories': { title: 'Nike Swoosh Green', img: women_accessories }, 
    'equipment': { title: 'Nike Swoosh Green',   img: women_equipment }, 
  },
  'sale': {
    'shoes': { title: 'Vaporfly 2',     img: men_shoes },
    'clothes': { title: 'Cargo Pants',  img: men_clothes },
    'accessories': { title: 'Backpack', img: men_accessories },
    'equipment': { title: 'TODO',       img: men_equipment },
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