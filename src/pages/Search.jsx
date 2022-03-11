import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import * as api from '../services/api';
import CategoriesButtons from '../components/CategoryButtons';
import Loading from '../components/Loading';
import '../styles/Buttons.css';
import ProductCard from '../components/ProductCard';

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
    };
  }

  componentDidMount() {
    this.requestCategories();
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
      const { id, title, thumbnail, price, shipping } = product;
      return { id, title, thumbnail, price, shipping };
    });
    this.setState({ products, loading: false });
  }

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  }

  searchProducts = () => {
    const { query, categoryId } = this.state;
    this.getProducts(categoryId, query);
  }

  render() {
    const { categories, loading, products } = this.state;
    return (
      <div>
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
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          <FaShoppingCart className="shopping-cart-icon" />
        </Link>
        {!loading && products.length > 0 && (
          <section>
            <p>{`Número de resultados: ${products.length}`}</p>
            {products.map((product) => (
              <ProductCard key={ product.id } product={ product } />
            ))}
          </section>
        )}
      </div>
    );
  }
}

// Requisito 2 feito por Pedro Henrique Moura e Jaziel da Conceição Silva
