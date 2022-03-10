// Feito em pair programming: Débora Serra, Regislaine Regis e Victor Reksidler

export async function getCategories() {
  const ENDPOINT_CATEGORIES = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(ENDPOINT_CATEGORIES);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  const queryCategory = categoryId ? `category=${categoryId}` : '';
  const queryInput = query ? `q=${encodeURI(query)}` : '';
  const ENDPOINT_SEARCH = `https://api.mercadolibre.com/sites/MLB/search?${queryCategory}${queryCategory && queryInput ? '&' : ''}${queryInput}`;
  console.log(ENDPOINT_SEARCH);
  const response = await fetch(ENDPOINT_SEARCH);
  const data = await response.json();
  return data.results;
}

export async function getProductsDetails(productId) {
  const ENDPOINT_PRODUCT = `https://api.mercadolibre.com/items/${productId}`;
  const response = await fetch(ENDPOINT_PRODUCT);
  const data = await response.json();
  return data;
}
