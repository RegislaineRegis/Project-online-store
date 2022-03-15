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
        <section className="cart-item-text-sect">
          <section className="title-price-sect">
            <h3 className="cart-item-title" data-testid="shopping-cart-product-name">
              { title }
            </h3>
            <p className="cart-item-price">
              { `R$ ${price ? price.toFixed(2).replace(/\./gm, ',') : price}` }
            </p>
          </section>
          <section className="cart-item-qtd-total-sect">
            <p
              data-testid="shopping-cart-product-quantity"
              className="cart-item-qtd"
            >
              { `Qtd: ${quantity}` }
            </p>
            <p className="cart-item-total">
              {`R$ ${total ? total.toFixed(2).replace(/\./gm, ',') : total}`}
            </p>
          </section>
        </section>
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
