import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CartItem extends Component {
  render() {
    const { product: { title, thumbnail, price, quantity } } = this.props;
    return (
      <section>
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <p>{ `R$ ${price.toFixed(2).replace(/\./gm, ',')}` }</p>
        <p data-testid="shopping-cart-product-quantity">{ `Un: ${quantity}` }</p>
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
  }).isRequired,
};

export default CartItem;
