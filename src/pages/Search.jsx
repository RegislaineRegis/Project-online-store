import React, { Component } from 'react';
import * as api from '../services/api';
import * as shoppinCart from '../services/saveShoppingCart';
import CategoriesButtons from '../components/CategoryButtons';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import '../styles/Buttons.css';

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
      showCat: false,
      glow: '',
    };
  }

  componentDidMount() {
    this.requestCategories();
    this.setState({ cartItems: shoppinCart.getShoppingCart(),
      query: localStorage.getItem('query'),
      categoryId: localStorage.getItem('catId'),
    }, () => {
      const { query, categoryId } = this.state;
      if (query || categoryId) this.getProducts(categoryId, query);
    });
  }

  componentWillUnmount() {
    const { query, categoryId } = this.state;
    localStorage.setItem('query', query);
    localStorage.setItem('catId', categoryId);
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
    this.setState({ loading: true,
      categoryId: id,
      showCat: false,
    }, () => this.getProducts(id, query));
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

  handleChange = ({ target }) => this.setState({ query: target.value });

  handleSort = ({ target }) => {
    this.setState({ sort: target.value }, () => this.sortProd());
  };

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
    this.setState({ glow: 'glow' }, () => {
      const { cartItems } = this.state;
      const prod = { title, id, thumbnail, price, quantity: 1, availableQuantity };
      shoppinCart.addItem(prod);
      const timeOut = 100;
      this.setState({ cartItems: [...cartItems, prod] }, () => {
        setTimeout(() => {
          this.setState({ glow: '' });
        }, timeOut);
      });
    });
  }

  showCats = () => this.setState((prevSt) => ({ showCat: !prevSt.showCat }));

  render() {
    const { categories, loading, products, sort, cartItems, showCat, glow } = this.state;
    const buying = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return (
      <div>
        <Header quantity={ buying } title="FrontEnd Masters" glow={ glow } />
        {loading && <Loading />}
        <button
          type="button"
          onClick={ this.showCats }
          className="cat-toggle-btn"
        >
          {showCat ? 'Ocultar' : 'Mostrar categorias'}
        </button>
        {showCat && !loading && (
          <section className="buttons-sect">
            {categories.map((cat) => (
              <CategoriesButtons
                key={ cat.id }
                id={ cat.id }
                category={ cat.name }
                handleClick={ this.handleClick }
              />
            ))}
          </section>
        )}
        <section className="search-sect">
          <input
            className="search-input"
            type="text"
            data-testid="query-input"
            name="query"
            onChange={ this.handleChange }
            placeholder="Escreva um termo para sua pesquisa"
          />
          <button
            className="search-btn"
            type="button"
            data-testid="query-button"
            onClick={ this.searchProducts }
          >
            Pesquisar
          </button>
        </section>
        {products.length === 0 && (
          <p className="guide-p" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        {!loading && products.length > 0 && (
          <select
            className="search-select"
            name="sort"
            onChange={ this.handleSort }
            value={ sort }
          >
            <option value="">Ordenar</option>
            <option value="asc">Menor preço</option>
            <option value="dsc">Maior preço</option>
          </select>
        )}
        {!loading && products.length > 0 && (
          <>
            <p className="search-result">{`Número de resultados: ${products.length}`}</p>
            <section className="cards-sect">
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
          </>
        )}
      </div>
    );
  }
}

// Requisito 2 feito por Pedro Henrique Moura e Jaziel da Conceição Silva
