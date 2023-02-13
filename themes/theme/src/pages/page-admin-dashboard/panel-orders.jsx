
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MantineProvider, Text } from '@mantine/core';
import { RangeCalendar } from '@mantine/dates';
import { format } from 'date-fns';

import { NotificationsProvider } from '@mantine/notifications';
import { showNotification, updateNotification, cleanNotifications } from '@mantine/notifications';
// showNotification – adds given notification to notifications list or queue depending on current state and limit
// updateNotification – updates notification that was previously added to the state or queue
// hideNotification – removes notification with given id from notifications state and queue
// cleanNotifications – removes all notifications from notifications state and queue
// cleanNotificationsQueue – removes all notifications from queue
import { IconCheck, IconX } from '@tabler/icons';


import { Modal, Button, Group, Table } from '@mantine/core';


import MobileMenu from './sidebar-mobile';
import DesktopSidebar from './sidebar-desktop';
import SearchBar from './search-bar';
import PageHeader from './main-header';

import { fireEvent } from '../../util/custom-event';
import { fetchGET, fetchPOST } from '../../util/fetch';
import { log, lo } from '../../util/log';

// ==============================================

const SQLtoJS = (date_time) => {
  // https://youtu.be/uXyng03RycQ
  const t = date_time.split(/[- :]/);
  // const date_js = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
  const date_js = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  return date_js;
}

// ==============================================

const JStoSQL = (date_time) => {
  // https://stackoverflow.com/a/44831930
  return date_time.toISOString().slice(0, 19).replace('T', ' ');
};

// ==============================================

function getDateXDaysAgo(numOfDays, date = new Date()) {
  const daysAgo = new Date(date.getTime());
  daysAgo.setDate(date.getDate() - numOfDays);
  return daysAgo;
}

// ==============================================

const Orders = ({ orders, openModal }) => {

  // --------------------------------------------

  return (

    <>
      {orders.length > 0 && orders.map((order, idx) => {

        // properties in each order object:
        //  -order_id, 
        //  -user_id, 
        //  -user_display_name, 
        //  -user_email, 
        //  -total, 
        //  -time_stamp, 
        //  -datetime_created, datetime_updated,

        // const mm_dd_yyyy = format(order.datetime_created, 'MM/dd/yyyy');
        // console.log('mm_dd_yyyy: ', mm_dd_yyyy);
        
        return (
          <tr class="bg-white">
            
            <td
              onClick={() => openModal(order)} 
              class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900"
            >
              <div class="flex">
                <button class="group inline-flex space-x-2 truncate text-sm">
                  {/* <!-- Heroicon name: mini/banknotes --> */}
                  <svg class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z" clip-rule="evenodd" />
                  </svg>
                  <p class="truncate text-gray-500 group-hover:text-gray-900">Order to {order.user_display_name}</p>
                </button>
              </div>
            </td>
            
            <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
              <span class="font-medium text-gray-900">${ order.total} </span>
              USD
            </td>

            {/* <td class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">success</span>
            </td> */}

            <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
              <time> { order.datetime_created.toDateString() } </time>
            </td>
            
            <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
              <time> { order.datetime_created.toLocaleString().split(',')[1] } </time>
              {/* <time> { order.datetime_created.toGMTString().split(',')[1] } </time> */}
            </td>


            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-right">
              {
                order.stage_1 === null
                  ? <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">no</span>
                  : <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">yes</span>
              }
            </td>


            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-right">
              {
                order.stage_2 === null 
                  ? <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">no</span>
                  : <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">yes</span>
              }
            </td>


            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-right">
              {
                order.stage_3 === null
                  ? <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">no</span>
                  : <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">yes</span>
              }
            </td>

            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-right">
              {
                order.stage_4 === null
                  ? <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">no</span>
                  : <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">yes</span>
              }
            </td>


            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 text-right">
              {
                order.stage_5 === null
                  ? <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 capitalize">no</span>
                  : <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">yes</span>
              }
            </td>
          
            <td 
              onClick={() => openModal(order)}
              class="relative whitespace-nowrap py-2 pl-3 pr-4 text-left text-sm font-medium sm:pr-6 cursor-pointer"
            >
              <span
                class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                  Details
              </span>
            </td>
          </tr>

        );
      })}
    </>

  );
};

// ==============================================

const Card = () => {
  return (

    <div class="overflow-hidden rounded-lg bg-white shadow">
      <div class="p-5">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg 
              // Heroicon name: outline/scale
              class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
            </svg>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="truncate text-sm font-medium text-gray-500">Account balance</dt>
              <dd>
                <div class="text-lg font-medium text-gray-900">$30,659.45</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-5 py-3">
        <div class="text-sm">
          <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">View all</a>
        </div>
      </div>
    </div>
    
  );
};

// ==============================================

const Cards = ({ updateOrders, date_range, setDateRange }) => {

  // --------------------------------------------

  const noteSending = () => {
    showNotification({
      id: 'REST',
      loading: true,
      title: 'Loading your data',
      message: 'Data will be loaded in 3 seconds, you cannot close this yet',
      autoClose: false,
      disallowClose: true,
    });
  }

  const noteSuccess = () => {
    updateNotification({
      id: 'REST',
      color: 'teal',
      title: 'Data was loaded',
      message: 'Notification will close in 2 seconds, you can close this notification now',
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
  };

  const noteFail = () => {
    updateNotification({
      id: 'REST',
      color: 'red',
      title: 'Data was loaded',
      message: 'Notification will close in 2 seconds, you can close this notification now',
      icon: <IconX size={16} />,
      autoClose: 2000,
    });
  };

  // --------------------------------------------

  const [clicked_yet, setClickedYet] = useState(false);



  // --------------------------------------------

  // const today = new Date(2023, 0, 3); // debug


  // useEffect(() => {
  //   console.warn('date_range: ', date_range);
  // }, [date_range]);

  // --------------------------------------------

  return (
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
      <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
      <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">


        {/* <!-- Card --> */}
        {/* <Card /> */}

        {/* <!-- Card --> */}
        {/* <Card /> */}
        
        {/* <!-- Card --> */}
        {/* <Card /> */}

        {/* <!-- Card --> */}
        <div class="overflow-hidden rounded-lg bg-white shadow">
          
          <div class="px-5 py-3 flex justify-center">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              {/* <Text>Welcome to Mantine!</Text> */}
              <RangeCalendar 
                amountOfMonths={1}
                value={date_range} 
                onChange={(new_date_range) => {

                  if (new_date_range[1] !== null) { // prev === null => currently clicking second date range => update orders with new date range
                    updateOrders({ date_range: new_date_range });
                  } 

                  setDateRange(new_date_range);
                }}
                onClick={() => setClickedYet(true)}
                dayStyle={(date) => {

                  const chosen_date_1_month  = date_range[0]?.getMonth();
                  const chosen_date_1_date   = date_range[0]?.getDate();
                  // const chosen_date_2_month  = date_range[1]?.getMonth();
                  const chosen_date_2_date   = date_range[1]?.getDate();

                  const calendar_month = date.getMonth();
                  const calendar_date = date.getDate();

                  // This is only for the inital page load with last week
                  if (!clicked_yet) {
                    if (calendar_month === chosen_date_1_month) {
                      if (chosen_date_1_date < calendar_date && calendar_date < chosen_date_2_date) {
                        return { backgroundColor: '#E7F5FF', borderRadius: 0 };
                      } 
                    }
                  }
                }}
              />
            </MantineProvider>
          </div>

        </div>

        {/* <!-- Card --> */}
        {/* <div class="overflow-hidden rounded-lg bg-white shadow col-span-2">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg 
                  // Heroicon name: outline/scale
                  class="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="truncate text-sm font-medium text-gray-500">Account balance</dt>
                  <dd>
                    <div class="text-lg font-medium text-gray-900">$30,659.45</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <a href="#" class="font-medium text-cyan-700 hover:text-cyan-900">View two months</a>
            </div>
          </div>
          
          <div class="px-5 py-3 flex justify-center">
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <RangeCalendar 
                value={date_range} 
                onChange={setDateRange}
                amountOfMonths={2}
              />
            </MantineProvider>
          </div>

        </div> */}

      </div>
    </div>

  );

};

// ==============================================

const OrderModal = ({ opened, setOpened, active_order }) => {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      // title="Introduce yourself!"
      transition="fade"
      transitionDuration={400}
      exitTransitionDuration={400}
      transitionTimingFunction="ease"
      overlayColor='black'
      overlayOpacity={0.7}
      // overlayBlur={3}
      fullScreen={true}
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-xl font-semibold text-gray-900">Order ID: </h1>
            <p class="mt-2 text-sm text-gray-700">User ID:</p>
            <p class="mt-2 text-sm text-gray-700">User Name:</p>
            <p class="mt-2 text-sm text-gray-700">Date:</p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {/* <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">Add user</button> */}
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Product ID</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Product Name</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">

                    {active_order && active_order?.products?.map(({title, product_id, product_price, qty}, idx) => {
                      return (
                        <tr>
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{product_id}</td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{title}</td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${product_price}</td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{qty}</td>

                          <td 
                            onClick={() => alert('display product details')}
                            class="relative whitespace-nowrap py-2 pl-3 pr-4 text-left text-sm font-medium sm:pr-6 cursor-pointer"
                          >
                            <span
                              class="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                Details
                            </span>
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
      </div>

    </Modal>
  );
}

// ==============================================

// ==============================================

export default function PanelOrders({ panel_refs }) {

  // --------------------------------------------

  const today = new Date();
  const [date_range, setDateRange] = useState([
    getDateXDaysAgo(6, today), // last week date range (including today)
    today,
  ]);

  // --------------------------------------------

  const [orders, setOrders] = useState([]);
  const [opened, setOpened] = useState(false);

  // --------------------------------------------

  const updateOrders = async ({ 
    date_range
  }) => {

    const url = `${PHP.rest_url}/orders`;
    // const data = await fetchPOST('http://jadefse.local/wp-json/josh/v1/orders', {
    const data = await fetchPOST(`${PHP.rest_url}/orders`, {
      date_range_min: JStoSQL(date_range[0]),
      date_range_max: JStoSQL(date_range[1]),
    });
    console.log('data: ', data);

    if (data.status === 2) { // success
      
      const orders = data.orders.map((order) => {
      
        const { datetime_created, datetime_updated } = order;
        
        const order_mod = { 
          ...order,
          datetime_created: SQLtoJS(datetime_created), 
          datetime_updated: SQLtoJS(datetime_updated),
        };
        
        return order_mod;
      });
  
      setOrders(orders);
      // noteSuccess();
    }
    else {
      console.error('data: ', data );
      // noteFail();
    }

  };

  // --------------------------------------------

  useEffect(() => {
    updateOrders({ date_range });
  }, []);

  // --------------------------------------------

  const [active_order, setActiveOrder] = useState({
    order: null,
    products: null,
  });

  // useEffect(() => {
  //   console.log('active_order: ', active_order);
  // }, [active_order]);

  // --------------------------------------------

  const openModal = async (order) => {

    setOpened(true);
    setActiveOrder(order);

    const id = order.order_id;

    // const { products } = await fetchGET(`http://jadefse.local/wp-json/josh/v1/order/${id}`);
    const { products } = await fetchGET(`${PHP.rest_url}/order/${id}`);

    setActiveOrder({ order, products });
  }

  // --------------------------------------------

  return (
    <>
      <OrderModal { ...{ opened, setOpened, active_order } } />

      <div 
        id="panel-1" 
        // ref={(el) => panel_refs.current[0] = el} 
        ref={(el) => panel_refs.current[0] = el} 
        class="mt-8 border border-sky-500 w-full" 
        style={{
          // border: 'dotted darkorange 5px', 
          position: 'absolute', 

          // -active:
          zIndex: 1, 
          opacity: 1, 
          
          // -inactive:
          // zIndex: 0, 
          // opacity: 0,
          // display: 'none'
        }}
      >

        <Cards { ...{ updateOrders, date_range, setDateRange } } />

        <h2 class="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">Recent activity</h2>

        {/* <!-- Activity list (smallest breakpoint only) --> */}
        <div class="shadow sm:hidden">
          <ul role="list" class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
            <li>
              <a href="#" class="block bg-white px-4 py-4 hover:bg-gray-50">
                <span class="flex items-center space-x-4">
                  <span class="flex flex-1 space-x-2 truncate">
                    {/* <!-- Heroicon name: mini/banknotes --> */}
                    <svg class="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z" clip-rule="evenodd" />
                    </svg>
                    <span class="flex flex-col truncate text-sm text-gray-500">
                      <span class="truncate">Payment to Molly Sanders</span>
                      <span><span class="font-medium text-gray-900">$20,000</span> USD</span>
                      <time datetime="2020-07-11">July 11, 2020</time>
                    </span>
                  </span>
                  {/* <!-- Heroicon name: mini/chevron-right --> */}
                  <svg class="h-5 w-5 flex-shrink-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                </span>
              </a>
            </li>

            {/* <!-- More transactions... --> */}
          </ul>

          <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3" aria-label="Pagination">
            <div class="flex flex-1 justify-between">
              <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Previous</a>
              <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Next</a>
            </div>
          </nav>
        </div>

        {/* <!-- Activity table (small breakpoint and up) --> */}
        <div class="hidden sm:block">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="mt-2 flex flex-col">
              <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900" scope="col">Customer Name</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Total</th>
                      {/* <th class="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block" scope="col">Status</th> */}
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Date</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Time</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Stage 1</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Stage 2</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Stage 3</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Stage 4</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col">Stage 5</th>
                      <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">

                    <Orders { ...{ orders, openModal } }/>

                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}