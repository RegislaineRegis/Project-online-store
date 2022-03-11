const CART_KEY = 'shoppingCartItems';

if (!localStorage.getItem(CART_KEY)) {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
}

export const getShoppingCart = () => {
  const getCart = JSON.parse(localStorage.getItem(CART_KEY));
  return getCart;
};

export const addItem = (item) => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  const newCart = [...cart, item];
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

export const updateItem = (item) => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  const newCart = cart.map((prod) => prod.id === item.id ? { ...prod, ...item } : prod);
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

export const removeItem = (item) => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};
