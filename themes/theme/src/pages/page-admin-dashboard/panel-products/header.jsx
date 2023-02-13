import { useState, useEffect } from 'react';

import CreateUpdateProductsModal from './CRUD--create-&-update-product-modal';

// ==============================================

export default function Header({ 
  categories, setCategories,
  tags, setTags,
  colors, setColors,
  sizes, setSizes,
  departments, setDepartments,
  resetFilters,
  updateProducts,
}) {

  // --------------------------------------------
  
  const [opened, setOpened] = useState(false); // create_product_modal
  
  // --------------------------------------------
  
  return (
    <>
      {/* ----------------------------------- */}

      {/* Create Product Modal */}
      <CreateUpdateProductsModal { ...{ 
          categories, setCategories,
          tags, setTags,
          colors, setColors,
          sizes, setSizes,
          departments, setDepartments,
          opened, setOpened,
          resetFilters,
          updateProducts
        } }
        CRUD_type='create'
      />

      {/* ----------------------------------- */}

      {/* Create Product Header (w. Add Product Button) */}

      <div class="flex justify-between mb-8">

        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Products</h1>
          <p class="mt-2 text-sm text-gray-700">Below are all the products. Filter by altering the input fields below.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button 
            onClick={() => setOpened(true)}
            type="button" 
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            style={{width: '115px'}}
          >Add Product</button>
        </div>
      </div> {/* Create Product Header (w. Add Product Button) */}

      {/* ----------------------------------- */}
    </>
  );
};