import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as cartFunctions from '../services/saveShoppingCart';

// requisito 15 - regislaine

class ProductCard extends React.Component {
  onClickAddProductCart = ({ title, id, thumbnail, price, availableQuantity }) => {
    cartFunctions
      .addItem({ title, id, thumbnail, price, quantity: 1, availableQuantity });
  }

  render() {
    const { product } = this.props;
    const { id, title, price, thumbnail, shipping, availableQuantity } = product;
    const { free_shipping: freeShipping } = shipping;
    const newProd = { title, id, thumbnail, price, availableQuantity };
    return (
      <section id={ id } data-testid="product">
        <h2>{title}</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price ? price.toFixed(2).replace(/\./gm, ',') : 'Sob consulta'}`}</p>

        {freeShipping && <p data-testid="free-shipping">Frete grátis</p>}
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          Detalhes do produto
        </Link>

        <button
          data-testid="product-add-to-cart"
          type="button"
          id={ id }
          onClick={ () => this.onClickAddProductCart(newProd) }
        >
          Adiconar produto ao carrinho
        </button>

      </section>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    availableQuantity: PropTypes.number,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
};

export default ProductCard;
