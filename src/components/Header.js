import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaChevronLeft, FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import '../styles/Header.css';

class Header extends React.Component {
  render() {
    const { quantity, title, glow } = this.props;
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
          <FaShoppingCart className={ `shopping-cart-icon ${glow}` } />
          <p
            className="qtd-cart"
            data-testid="shopping-cart-size"
          >
            { quantity }
          </p>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  glow: PropTypes.string,
};

Header.defaultProps = {
  glow: '',
};

export default Header;
