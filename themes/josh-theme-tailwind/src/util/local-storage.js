// ==============================================

const getLS = (key /*: string */) => JSON.parse(localStorage.getItem(key));

// ==============================================

const setLS = (key, value /*: string, object */) => localStorage.setItem(key, JSON.stringify(value));

// ==============================================

const getCartLS = () => getLS('cart');
const setCartLS = (cart) => setLS('cart', cart);

// ==============================================

// -Not using local storage at all for auth - using PHP SSR with cookies sent with each request
// const setLoggedInLS = (x) => setLS('logged_in', x);
// const getLoggedInLS = (x) => getLS('logged_in');

// ==============================================

const getFiltersLS = () => getLS('filters');
const setFiltersLS = ({ department, tag, category }) => {
  setLS('filters', { department, tag, category });
};

// ==============================================

export { 
  getLS, setLS,
  getCartLS, setCartLS, 
  getFiltersLS, setFiltersLS
 };