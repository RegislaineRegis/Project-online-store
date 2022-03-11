import React from 'react';
import PropTypes from 'prop-types';
import * as cartFunctions from '../services/saveShoppingCart';
import { Link } from 'react-router-dom';

// requisito 15 - regislaine

class ProductCard extends React.Component {
  onClickAddProductCart = ({ title, id, thumbnail, price }) => {
    shoppinCart.addItem({ title, id, thumbnail, price, quantity: 1 });
  }
  
  render() {
    const { product } = this.props;
    const { id, title, price, thumbnail, shipping } = product;
    const { free_shipping: freeShipping } = shipping;
    return (
      <section id={ id } data-testid="product">
        <h2>{title}</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price.toFixed(2).replace(/\./gm, ',')}`}</p>

        {freeShipping && <p data-testid="free-shipping">Frete grátis</p>}
        <Link data-testid="product-detail-link" to={ `/product/${id}` }>
          Detalhes do produto
        </Link>

        <button
          data-testid="product-add-to-cart"
          type="button"
          id={ id }
          onClick={ () => this.onClickAddProductCart({title, id, thumbnail, price}) }
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
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool,
    }),
  }).isRequired,
};

export default ProductCard;
