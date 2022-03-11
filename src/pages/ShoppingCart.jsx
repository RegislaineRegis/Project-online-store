import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as cartFunctions from '../services/saveShoppingCart';
import CartItem from '../components/CartItem';

export default class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const products = cartFunctions.getShoppingCart();
    this.setState({ products });
  }

  render() {
    const { products } = this.state;
    return (
      <section>
        <Link to="/"> HOME </Link>
        {products.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          products.map((product) => (
            <CartItem product={ product } key={ product.id } />
          ))
        ) }
      </section>
    );
  }
}

// Requisito 3 feito por Pedro Henrique Moura e Victor Bariatto Reksidler
