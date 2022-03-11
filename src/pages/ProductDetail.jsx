import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import Loading from '../components/Loading';

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
    };
  }

  componentDidMount() {
    // console.log(this.props)
    const { match: { params: { id } } } = this.props;
    this.getProduct(id);
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
      dateCreated, lastUpdated, loading } = this.state;

    const created = dateCreated.split('T')[0].split('-').reverse().join('/');
    const updated = lastUpdated.split('T')[0].split('-').reverse().join('/');
    const product = (
      <section>
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
          { `Preço: R$ ${price.toFixed(2).replace(/\./gm, ',')} - Status: ${status}` }
        </h3>
        {acceptsMercadopago && <img src="https://selectra.net.br/sites/selectra.net.br/files/styles/article_hero/public/images/mercado-pago-825x293.png?itok=rla5wE_U" alt="Aceita MercadoPago" />}
        {freeShipping && <p>Frete Grátis</p>}
        <p>{warranty}</p>
        <h3>Especificações técnicas: </h3>
        <ul>
          {attributes.map((attr) => (
            <li key={ attr.name }>
              <h3>{attr.name}</h3>
              <p>{attr.value_name}</p>
            </li>
          ))}
        </ul>
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
