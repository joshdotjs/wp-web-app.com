import { useState, useEffect } from 'react';

import CreateUpdateProductsModal from './CRUD--create-&-update-product-modal';

// ==============================================

export default function Table ({ products,
    categories, setCategories,
    tags, setTags,
    colors, setColors,
    sizes, setSizes,
    departments, setDepartments,
    resetFilters,
    updateProducts,
  }) 
{

  // --------------------------------------------
  
  const [opened, setOpened] = useState(false); // create_product_modal

  const [id, setId] = useState(); // clicked product ID to update
  
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
          id,
          resetFilters,
          updateProducts,
        } }
        CRUD_type='update'
      />

      {/* ----------------------------------- */}

      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    {/* <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Transaction ID</th> */}
                    {/* <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="whitespace-nowrap py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Transaction ID</th> */}
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product ID</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categories</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tags</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Color</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stock</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Details</span>
                    </th>
                    <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">

                  {products.length > 0 && products.map(({ID, title, permalink, category, tag, color, size, department, price, stock, rating, num_ratings}) => {
                    return (
                      <tr>
                        <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">{ID}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{title}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{category}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{tag}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{color}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{size}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{department}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{price}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{stock}</td>
                        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{rating}</td>

                        <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <a 
                            href={permalink}
                            target="_blank"
                            onClick={(e) => {
                              console.log('permalink: ', permalink);
                            }}
                            class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                              Details
                          </a>
                        </td>
                        <td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <button 
                            onClick={() => {
                              setId(ID);
                              setOpened(true);
                            }}
                            class="text-indigo-600 hover:text-indigo-900"
                          >
                              Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------- */}
    </>
  );
};