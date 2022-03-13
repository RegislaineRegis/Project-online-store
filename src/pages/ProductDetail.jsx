import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaBox, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import * as api from '../services/api';
import * as shoppinCart from '../services/saveShoppingCart';
import Loading from '../components/Loading';
import EspecificacoesTecnicas from '../components/EspecificacoesTecnicas';
import Header from '../components/Header';

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
      cartItems: shoppinCart.getShoppingCart(),
      show: 'specs',
      picIndex: 0,
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
      pictures: pictures.filter((pic) => pic.url),
      acceptsMercadopago,
      freeShipping,
      attributes,
      warranty,
      status,
      dateCreated,
      lastUpdated,
      loading: false });
  }

  changeClass = (value) => {
    this.setState({ show: value });
  }

  prevPic = () => {
    const { pictures } = this.state;
    let { picIndex } = this.state;
    picIndex = picIndex === 0
      ? pictures.length - 1 : picIndex - 1;
    this.setState({ picIndex });
  }

  nextPic = () => {
    const { pictures } = this.state;
    let { picIndex } = this.state;
    const length = pictures.length - 1;
    picIndex = picIndex === length ? 0 : picIndex + 1;
    this.setState({ picIndex });
  }

  render() {
    const { title, price, availableQuantity, condition, pictures,
      acceptsMercadopago, freeShipping, attributes, warranty, status,
      dateCreated, lastUpdated, loading, cartItems, show, picIndex } = this.state;
    const buying = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const created = dateCreated.split('T')[0].split('-').reverse().join('/');
    const updated = lastUpdated.split('T')[0].split('-').reverse().join('/');
    const newPrice = price ? price.toFixed(2).replace(/\./gm, ',') : price;
    const product = (
      <section>
        <Header quantity={ buying } title="FrontEnd Masters" />
        <section>
          <section className="dets-header">
            <p className="dets-p">{`Criado em: ${created}`}</p>
            <p className="dets-p">{`Ultima atualização: ${updated}`}</p>
            <p className="dets-p">{`Condição: ${condition}`}</p>
          </section>
          <p className="dets-available">{ `${availableQuantity} und` }</p>
          {status === 'active' && <FaCheckCircle className="dets-check" />}
        </section>
        <section className="dets-title-sect">
          <h1 className="dets-title" data-testid="product-detail-name">{title}</h1>
          {acceptsMercadopago && <img className="dets-merc-pago" src="https://selectra.net.br/sites/selectra.net.br/files/styles/article_hero/public/images/mercado-pago-825x293.png?itok=rla5wE_U" alt="Aceita MercadoPago" />}
        </section>
        <section className="imgDetails">
          <FaChevronLeft
            className="prev-pic"
            onClick={ this.prevPic }
          />
          <img
            src={ pictures[picIndex] && pictures[picIndex].url }
            alt={ `${title} - foto ${picIndex + 1}` }
          />
          <FaChevronRight
            className="next-pic"
            onClick={ this.nextPic }
          />
          {/* <section>
            {pictures.map((pic, index) => (
              <img src={ pic.url } alt={ `${title} - foto ${index + 1}` } />
            ))}
          </section> */}
        </section>
        <h3 className="dets-price">
          { `R$ ${newPrice}` }
        </h3>
        <button
          className="dets-add-cart-btn"
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleClick }
        >
          Adicionar ao Carrinho
        </button>
        {freeShipping && (
          <p className="dets-ship">
            <FaBox className="dets-ship-icon" />
            Frete Grátis
          </p>
        )}
        <p className="dets-warr">{warranty}</p>
        <section>
          <h3
            className="dets-specs"
            onClick={ () => this.changeClass('specs') }
            role="presentation"
          >
            Especificações técnicas:
          </h3>
          <h3
            className="dets-eval"
            onClick={ () => this.changeClass('eval') }
            role="presentation"
          >
            Avaliações:
          </h3>
        </section>
        {show === 'specs' && <EspecificacoesTecnicas attributes={ attributes } />}
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
