export default function ButtonCart({ openDrawerCart, num_cart_items }) {

  return (
    
    <div // cart-icon
      class="relative cursor-pointer h-[30px] w-[30px]"
      // style={{ color: 'white' }}
      onClick={() => openDrawerCart()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
      </svg>

      {
        num_cart_items > 0 &&
        <div
          class="absolute top-0 left-0"
          style={{
            // background: 'rgba(255,0,0,0.5)',
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            paddingTop: '7px',
            fontSize: '13px'
          }}
        >{num_cart_items}</div>
      }
    </div>

  // <button type="button" class="group -m-2 flex items-center p-2" aria-expanded="false">
  //   <svg class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
  //     <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  //   </svg>
  //   <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
  //   <span class="sr-only">items in cart, view bag</span>
  // </button>
  );
}