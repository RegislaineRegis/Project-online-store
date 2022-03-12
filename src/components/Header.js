import React from 'react';
import { FaShoppingCart, FaChevronLeft, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as shoppinCart from '../services/saveShoppingCart';
import '../styles/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: shoppinCart.getShoppingCart(),
    }
  }

  render() {
    const { quantity, title } = this.props;
    return (
      <header>
        <Link to="/"><FaChevronLeft className="back-icon" /></Link>
        <h1 className="header-title">{title} <FaCode /></h1>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
          className="shop-sect"
        >
          <FaShoppingCart className="shopping-cart-icon" />
          <p className="qtd-cart">{ quantity }</p>
        </Link>
      </header>
    )
  }
}

export default Header;
