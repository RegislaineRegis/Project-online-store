import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaBox } from 'react-icons/fa';
import * as api from '../services/api';
import * as shoppinCart from '../services/saveShoppingCart';
import SpecsEval from '../components/SpecsEval';
import Header from '../components/Header';
import ProdDetsHeader from '../components/ProdDetsHeader';
import ImagesProdDets from '../components/ImagesProdDets';
import ProdDetsButtons from '../components/ProdDetsButtons';
import DetsTitle from '../components/DetsTitle';
import '../styles/ProductDetails.css';

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
      quantity: 1,
      cartItems: shoppinCart.getShoppingCart(),
      show: 'specs',
      picIndex: 0,
      zoom: false,
      glow: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProduct(id);
  }

  handleClick = () => {
    const { title, id, thumbnail, price, quantity, availableQuantity } = this.state;
    this.setState({ glow: 'glow' }, () => {
      shoppinCart.addItem({ title, id, thumbnail, price, quantity, availableQuantity });
      const timeOut = 50;
      setTimeout(() => {
        this.setState({ cartItems: shoppinCart.getShoppingCart(),
          quantity: 1,
          glow: '' });
      }, timeOut);
    });
  }

  getProduct = async (id) => {
    const response = await api.getProductsDetails(id);
    const { available_quantity: availableQuantity, pictures,
      accepts_mercadopago: acceptsMercadopago,
      shipping: { free_shipping: freeShipping },
      date_created: dateCreated, last_updated: lastUpdated } = response;
    this.setState({ id: response.id,
      title: response.title,
      thumbnail: response.thumbnail,
      price: response.price,
      availableQuantity,
      condition: response.condition,
      pictures: pictures.filter((pic) => pic.url),
      acceptsMercadopago,
      freeShipping,
      attributes: response.attributes,
      warranty: response.warranty,
      status: response.status,
      dateCreated,
      lastUpdated });
  }

  changeClass = (value) => this.setState({ show: value });

  prevPic = () => {
    const { pictures } = this.state;
    let { picIndex } = this.state;
    picIndex = picIndex === 0 ? pictures.length - 1 : picIndex - 1;
    this.setState({ picIndex });
  }

  nextPic = () => {
    const { pictures } = this.state;
    let { picIndex } = this.state;
    const length = pictures.length - 1;
    picIndex = picIndex === length ? 0 : picIndex + 1;
    this.setState({ picIndex });
  }

  selectPhoto = ({ target }) => this.setState({ picIndex: parseFloat(target.id) });

  zoomImg = () => this.setState((prevSt) => ({ zoom: !prevSt.zoom }));

  removeQuantity = () => {
    let { quantity } = this.state;
    quantity = quantity === 0 ? 0 : quantity - 1;
    this.setState({ quantity });
  }

  addQuantity = () => {
    const { availableQuantity } = this.state;
    let { quantity } = this.state;
    quantity = quantity < availableQuantity ? quantity + 1 : availableQuantity;
    this.setState({ quantity });
  }

  render() {
    const { id, title, price, pictures, zoom, acceptsMercadopago,
      freeShipping, attributes, warranty, cartItems,
      dateCreated, lastUpdated, condition, availableQuantity, status,
      show, picIndex, quantity, glow } = this.state;
    const buying = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const newPrice = price ? price.toFixed(2).replace(/\./gm, ',') : price;
    return (
      <section>
        <Header quantity={ buying } title="FrontEnd Masters" glow={ glow } />
        <section className="prod-dets-sect">
          <section className="dets-sect">
            <ProdDetsHeader
              dateCreated={ dateCreated }
              lastUpdated={ lastUpdated }
              condition={ condition }
              availableQuantity={ availableQuantity }
              status={ status }
            />
            <DetsTitle
              title={ title }
              acceptsMercadopago={ acceptsMercadopago }
            />
            <ImagesProdDets
              pictures={ pictures }
              picIndex={ picIndex }
              title={ title }
              zoom={ zoom }
              prevPic={ this.prevPic }
              nextPic={ this.nextPic }
              zoomImg={ this.zoomImg }
            />
            <section className="dets-galery">
              {pictures.map((pic, index) => (
                <img
                  width="30"
                  className="dets-galery-img"
                  id={ index }
                  key={ index }
                  src={ pic.url }
                  alt={ `${title} - foto ${index + 1}` }
                  onClick={ this.selectPhoto }
                  role="presentation"
                />
              ))}
            </section>
            <section className="ship-price-sect">
              <h3 className="dets-price">
                { `R$ ${newPrice}` }
              </h3>
              {freeShipping && (
                <p className="dets-ship">
                  <FaBox className="dets-ship-icon" />
                  Frete Grátis
                </p>
              )}
            </section>
            <section className="btns-sect">
              <ProdDetsButtons
                handleClick={ this.handleClick }
                removeQuantity={ this.removeQuantity }
                quantity={ quantity }
                addQuantity={ this.addQuantity }
              />
            </section>
            <p className="dets-warr">{warranty}</p>
          </section>
          <section className="dets-spec-eval">
            <SpecsEval
              show={ show }
              changeClass={ this.changeClass }
              attributes={ attributes }
              id={ id }
            />
          </section>
        </section>
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
