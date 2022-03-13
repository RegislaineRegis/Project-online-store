import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaChevronLeft, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { quantity, title } = this.props;
    return (
      <header>
        <Link to="/"><FaChevronLeft className="back-icon" /></Link>
        <h1 className="header-title">
          {title}
          <FaCode />
        </h1>
        <Link
          to="/shopping-cart"
          data-testid="shopping-cart-button"
          className="shop-sect"
        >
          <FaShoppingCart className="shopping-cart-icon" />
          <p className="qtd-cart">{ quantity }</p>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
