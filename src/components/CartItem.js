import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/CartItems.css';
// import * as cartFunctions from '../services/saveShoppingCart';

class CartItem extends Component {
  render() {
    const { product: { title, thumbnail, price, quantity, id } } = this.props;
    const total = price * quantity;
    return (
      <section className="cart-item" id={ id }>
        <img className="cart-item-img" src={ thumbnail } alt={ title } />
        <h3 className="cart-item-title" data-testid="shopping-cart-product-name">
          { title }
        </h3>
        <p className="cart-item-price">
          { `Preço unid: R$ ${price ? price.toFixed(2).replace(/\./gm, ',') : price}` }
        </p>
        <p className="cart-item-total">
          {`Preço total: R$ ${total ? total.toFixed(2).replace(/\./gm, ',') : total}`}
        </p>
      </section>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    id: PropTypes.string,
  }).isRequired,
};

export default CartItem;
