const CART_KEY = 'shoppingCartItems';
if (!localStorage.getItem('query')) {
  localStorage.setItem('query', '');
}

if (!localStorage.getItem('catId')) {
  localStorage.setItem('catId', '');
}

if (!localStorage.getItem(CART_KEY)) {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
}

export const getShoppingCart = () => {
  const getCart = JSON.parse(localStorage.getItem(CART_KEY));
  return getCart;
};

export const updateItem = (item) => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  const newCart = cart.map((prod) => {
    if (prod.id === item.id) {
      return { ...prod, ...item };
    } return prod;
  });
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

export const addItem = (item) => {
  const { id, title, thumbnail, availableQuantity } = item;
  let { quantity } = item;
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  if (cart.some((prod) => prod.id === item.id)) {
    const prod = cart.find((myProd) => myProd.id === item.id);
    quantity = quantity < availableQuantity
      && quantity + prod.quantity < availableQuantity
      ? quantity + prod.quantity : availableQuantity;
    const newItem = { id, title, thumbnail, availableQuantity, quantity };
    return updateItem(newItem);
  }
  const newCart = [...cart, item];
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};

export const removeItem = (item) => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  const newCart = cart.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
};
