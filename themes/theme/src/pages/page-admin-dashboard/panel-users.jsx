import { useState, useEffect } from 'react';

import { fetchGET } from '../../util/fetch';

// ==============================================

export default function PanelUsers({panel_refs}) {

  // --------------------------------------------

  const [users, setUsers] = useState([]);

  useEffect(() => {

    (async () => {
      // const data = await fetchGET('http://jadefse.local/wp-json/josh/v1/users');
      const data = await fetchGET(`${PHP.rest_url}/users`);
      const { status, message, users } = data;
      // console.log('data: ', data);
      
      if (status === 2) {
        setUsers(users);
        // console.log('users: ', users);
      } else {
        // console.error('panel-users.jsx: ', message);
      }
    })();

  }, []);

  // --------------------------------------------

  return (
    <div 
      id="panel-4" 
      ref={(el) => 
      panel_refs.current[3] = el} 
      class="mt-8 border w-full" 
      style={{
        // border: 'solid darkorchid 5px', 
        position: 'absolute', 
        zIndex: 0, 
        opacity: 0,
        display: 'block'
      }}
    >

      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex sm:items-center" 
          // style={{border: 'solid red 10px'}}
        >
          <div class="flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Users</h1>
            <p class="mt-2 text-sm text-gray-700">Below are all of the users.</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none" style={{minWidth: '100px'}}>
            <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button>
          </div>
        </div>
        <div class="mt-8 flex flex-col" 
          // style={{ border: 'solid green 2px'}}
        >
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {/* <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"> */}
            <div class="inline-block min-w-full py-2 align-middle ">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                      <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                      <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th style={{paddingTop: '1rem', paddingBottom: '1rem'}} scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">

                    {users.length > 0 && 
                      users.map(({ id, roles, display_name, email, login, nicename, registered, status, url }) => {
                        return (
                          <tr>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </div>
                                <div class="ml-4">
                                  <div class="font-medium text-gray-900">{display_name}</div>
                                  <div class="text-gray-500">{email}</div>
                                </div>
                              </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div class="text-gray-900">Front-end Developer</div>
                              <div class="text-gray-500">Optimization</div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">{status}</span>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{JSON.stringify(roles)}</td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, Lindsay Walton</span></a>
                            </td>
                          </tr>
                        );
                      })                   
                    }

                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>














    </div>
  );
}