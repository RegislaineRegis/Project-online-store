import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import * as cartFunctions from '../services/saveShoppingCart';

class CartItem extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      price: 0,
      thumbnail: '',
      quantity: 1,
    };
  }

  componentDidMount() {
    const { product: { title, thumbnail, price, quantity, id } } = this.props;
    this.setState({ title, thumbnail, price, quantity, id });
  }

  // removeQuantity = () => {
  //   this.setState((prev) => ({
  //     quantity: prev.quantity > 1 ? prev.quantity - 1 : prev.quantity,
  //   }), () => {
  //     const { id, title, quantity, price, thumbnail } = this.state;
  //     cartFunctions.updateItem({ id, title, quantity, price, thumbnail });
  //   });
  // }

  // addQuantity = () => {
  //   // const { quantity } = this.state;
  //   this.setState((prev) => ({ quantity: prev.quantity + 1 }), () => {
  //     const { id, title, quantity, price, thumbnail } = this.state;
  //     cartFunctions.updateItem({ id, title, quantity, price, thumbnail });
  //   });
  // }

  // deleteProd = () => {
  //   const { title, thumbnail, price, quantity, id } = this.state;
  //   cartFunctions.removeItem({ title, thumbnail, price, quantity, id });
  // }

  render() {
    const { product: { title, thumbnail, price, quantity, id } } = this.props;
    const total = price * quantity;
    return (
      <section id={ id }>
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="shopping-cart-product-name">
          { title }
        </h3>
        <p>
          { `Preço unid: R$ ${price.toFixed(2).replace(/\./gm, ',')}` }
        </p>
        <p>
          {`Preço total: R$ ${total.toFixed(2).replace(/\./gm, ',')}`}
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
