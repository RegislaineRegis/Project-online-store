import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// requisito 15 - regislaine

class ProductCard extends React.Component {
  render() {
    const { product, handleClick, className } = this.props;
    const { id, title, price, thumbnail, shipping, availableQuantity } = product;
    const { free_shipping: freeShipping } = shipping;
    const newProd = { title, id, thumbnail, price, availableQuantity };
    return (
      <section
        id={ id }
        data-testid="product"
        className={ className }
      >
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
          onClick={ () => handleClick(newProd) }
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
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default ProductCard;
