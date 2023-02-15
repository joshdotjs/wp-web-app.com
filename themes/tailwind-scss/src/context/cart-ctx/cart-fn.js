import { fireEvent } from '@/util/events';
import { getLS, setLS, removeLS } from '@/util/local-storage';

// ==============================================

const getCartLS = () => getLS('cart');
const setCartLS = (cart) => setLS('cart', cart);

// ==============================================

 const addToCartLS = ({ product, variant, fire=false }) => {

  const { id: variant_id } = variant;

  // -Step 1: get cart from LS:
  // -Step 2: add item to local cart
  //  --2.1: If item is in already in cart then increment count.
  // -Step 3: update cart LS
  // -Step 4: fire event
  // -Step 5: listen for event and handle in <Cart />


  // Step 1:
  const prev_cart = getCartLS();
  // -if cart-ls not set then prev_cart === null  =>  idx===undefined

  // Step 2:
  const idx = prev_cart?.findIndex(line => line?.variant.id === variant_id);
  
  let new_cart;

  if (idx === undefined) {
    new_cart = [{ product, variant, qty: 1 }];
  } else if (idx < 0) {
    // lo('addToCart() - new line item');
    new_cart = [...prev_cart, { product, variant, qty: 1 }]; 
  } else {
    // ly('addToCart() - updating quantity');
    new_cart = [...prev_cart]; // clone local cart state via deep copy.
    new_cart[idx] = {...prev_cart[idx], qty: prev_cart[idx].qty + 1}; // update specific item's quantity in the cloned cart array.        
  }

  // Step 3:
  setCartLS(new_cart);

  // Step 4:
  if (fire)
    fireEvent('cart-add');
};

// ==============================================

const removeFromCartLS = (variant_id) => {
  // lg('removeFromCart()');

  const prev_cart = getCartLS();
  // console.log('prev_cart: ', prev_cart);

  const new_cart = prev_cart.filter(line => line.variant.id !== variant_id);
  setCartLS(new_cart);
  updateNumCartItems();
  // fireEvent('cart-remove');

  // if (new_cart.length < 1) {
  //   closeCart();
  // }
}

// ==============================================

const updateNumCartItems = () => {

  const cart_count = document.querySelector('header#navbar #cart-count');
  
  const cart = getCartLS();
  const num_items_in_cart = cart?.length;

  const cart_count_span = cart_count.querySelector('span');
  cart_count_span.textContent = num_items_in_cart;

  if (num_items_in_cart > 0) {
    cart_count.style.opacity = 1;
  } else {
    cart_count.style.opacity = 0;
  }
};

// ==============================================

const clearCartLS = () => {
  setCartLS([]);
};

// ==============================================

export { 
  getCartLS,
  addToCartLS, 
  removeFromCartLS,
  updateNumCartItems,
  clearCartLS,
 };