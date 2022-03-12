import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import * as api from '../services/api';
import * as shoppinCart from '../services/saveShoppingCart';
import Loading from '../components/Loading';
import EspecificacoesTecnicas from '../components/EspecificacoesTecnicas';

export default class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      thumbnail: '',
      price: 0,
      availableQuantity: 0,
      condition: '',
      pictures: [],
      acceptsMercadopago: false,
      freeShipping: false,
      attributes: [],
      warranty: '',
      status: '',
      dateCreated: '',
      lastUpdated: '',
      loading: true,
      quantity: 1,
      cartItems: shoppinCart.getShoppingCart().length,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProduct(id);
  }

  handleClick = () => {
    const { title, id, thumbnail, price, quantity, availableQuantity } = this.state;
    shoppinCart.addItem({ title, id, thumbnail, price, quantity, availableQuantity });
    this.setState({ cartItems: shoppinCart.getShoppingCart().length });
  }

  getProduct = async (id) => {
    const response = await api.getProductsDetails(id);
    const { title,
      thumbnail,
      price,
      available_quantity: availableQuantity,
      condition,
      pictures,
      accepts_mercadopago: acceptsMercadopago,
      shipping: { free_shipping: freeShipping },
      attributes,
      warranty,
      status,
      date_created: dateCreated,
      last_updated: lastUpdated } = response;
    this.setState({ id,
      title,
      thumbnail,
      price,
      availableQuantity,
      condition,
      pictures,
      acceptsMercadopago,
      freeShipping,
      attributes,
      warranty,
      status,
      dateCreated,
      lastUpdated,
      loading: false });
  }

  render() {
    const { title, price, availableQuantity, condition, pictures,
      acceptsMercadopago, freeShipping, attributes, warranty, status,
      dateCreated, lastUpdated, loading, cartItems } = this.state;
    const buying = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const created = dateCreated.split('T')[0].split('-').reverse().join('/');
    const updated = lastUpdated.split('T')[0].split('-').reverse().join('/');
    const newPrice = price ? price.toFixed(2).replace(/\./gm, ',') : price;
    const product = (
      <section>
        <Link to="/">HOME</Link>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
        >
          <FaShoppingCart className="shopping-cart-icon" />
          <p>{ buying }</p>
        </Link>
        <h1 data-testid="product-detail-name">{title}</h1>
        <p>{`Condição: ${condition}`}</p>
        <p>{`Criado em: ${created}`}</p>
        <p>{`Ultima atualização: ${updated}`}</p>
        <section className="imgDetails">
          {pictures.filter((pic) => pic.url).map((pic) => (
            <img key={ pic.id } src={ pic.url } alt={ title } />
          ))}
        </section>
        <p>{ `Quantidade disponível: ${availableQuantity}` }</p>
        <h3>
          { `Preço: R$ ${newPrice} - Status: ${status}` }
        </h3>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao Carrinho
        </button>
        {acceptsMercadopago && <img src="https://selectra.net.br/sites/selectra.net.br/files/styles/article_hero/public/images/mercado-pago-825x293.png?itok=rla5wE_U" alt="Aceita MercadoPago" />}
        {freeShipping && <p>Frete Grátis</p>}
        <p>{warranty}</p>
        <h3>Especificações técnicas: </h3>
        <EspecificacoesTecnicas attributes={ attributes } />
      </section>
    );

    return (
      <section>
        {loading ? <Loading /> : product}
      </section>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
