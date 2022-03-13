import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';

class ProdDetsButtons extends React.Component {
  render() {
    const { handleClick, removeQuantity, quantity, addQuantity } = this.props;
    return (
      <>
        <button
          className="dets-add-cart-btn"
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ handleClick }
        >
          <FaShoppingCart className="dets-shop-cart-icon" />
          Adicionar ao Carrinho
        </button>
        <button
          className="dets-cart-less-btn"
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ removeQuantity }
        >
          -
        </button>
        <p className="dets-und">{quantity}</p>
        <button
          className="dets-cart-more-btn"
          type="button"
          data-testid="product-increase-quantity"
          onClick={ addQuantity }
        >
          +
        </button>
      </>
    );
  }
}

ProdDetsButtons.propTypes = {
  handleClick: PropTypes.func.isRequired,
  removeQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  addQuantity: PropTypes.func.isRequired,
};

export default ProdDetsButtons;
