import React, { Component } from 'react';
import * as api from '../services/api';
import * as shoppinCart from '../services/saveShoppingCart';
import CategoriesButtons from '../components/CategoryButtons';
import Loading from '../components/Loading';
import '../styles/Buttons.css';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

// Feito em pair programming com: Victor Reksidler, Pedro Henrique Moura, Regislaine Regis, Jaziel Silva, Débora Serra

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      categories: [],
      loading: true,
      products: [],
      categoryId: '',
      sort: '',
      cartItems: [],
    };
  }

  componentDidMount() {
    this.requestCategories();
    this.setState({ cartItems: shoppinCart.getShoppingCart() });
  }

  requestCategories = async () => {
    const categories = await api.getCategories();
    this.setState({
      categories,
      loading: false,
    });
  }

  handleClick = ({ target }) => {
    const { id } = target;
    const { query } = this.state;
    this.setState({ loading: true, categoryId: id }, () => this.getProducts(id, query));
  }

  getProducts = async (categoryId = '', query = '') => {
    const receiveProducts = await api.getProductsFromCategoryAndQuery(categoryId, query);
    const products = receiveProducts.results.map((product) => {
      const { id, title, thumbnail, price, shipping,
        available_quantity: availableQuantity } = product;
      return { id,
        title,
        thumbnail,
        price,
        shipping,
        availableQuantity };
    });
    this.setState({ products, loading: false });
  }

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  }

  handleSort = ({ target }) => {
    this.setState({ sort: target.value }, () => this.sortProd());
  }

  sortProd = () => {
    const { products, sort } = this.state;
    let newList = products;
    if (sort === 'dsc') {
      newList = products.sort((a, b) => b.price - a.price);
    }
    if (sort === 'asc') {
      newList = products.sort((a, b) => a.price - b.price);
    }
    this.setState({ products: newList });
  }

  searchProducts = () => {
    const { query, categoryId } = this.state;
    this.getProducts(categoryId, query);
  }

  onClickAddProductCart = ({ title, id, thumbnail, price, availableQuantity }) => {
    shoppinCart
      .addItem({ title, id, thumbnail, price, quantity: 1, availableQuantity });
    this.setState({ cartItems: shoppinCart.getShoppingCart() });
  }

  render() {
    const { categories, loading, products, sort, cartItems } = this.state;
    const buying = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return (
      <div>
        <Header quantity={ buying } title="FrontEnd Masters" />
        <section className="buttons-sect">
          {loading ? <Loading /> : (
            categories.map((cat) => (
              <CategoriesButtons
                key={ cat.id }
                id={ cat.id }
                category={ cat.name }
                handleClick={ this.handleClick }
              />
            ))
          )}
        </section>
        <select
          name="sort"
          onChange={ this.handleSort }
          value={ sort }
        >
          <option value="">Ordenar</option>
          <option value="asc">Menor preço</option>
          <option value="dsc">Maior preço</option>
        </select>
        <input
          type="text"
          data-testid="query-input"
          name="query"
          onChange={ this.handleChange }
          placeholder="Escreva um termo para sua pesquisa"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.searchProducts }
        >
          Pesquisar
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {!loading && products.length > 0 && (
          <section className="card-sect">
            <p>{`Número de resultados: ${products.length}`}</p>
            {products.map((product) => (
              <ProductCard
                key={ product.id }
                product={ product }
                handleClick={ this.onClickAddProductCart }
                className={ cartItems
                  .some((item) => item.id === product.id)
                  ? 'prod-card selected' : 'prod-card' }
              />
            ))}
          </section>
        )}
      </div>
    );
  }
}

// Requisito 2 feito por Pedro Henrique Moura e Jaziel da Conceição Silva
