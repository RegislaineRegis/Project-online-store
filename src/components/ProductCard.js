import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaBox } from 'react-icons/fa';
// import '../styles/ProductCard.css';
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
        <h2 className="card-title">{title}</h2>
        <img className="card-img" src={ thumbnail } alt={ title } />
        <p className="card-price">
          {`R$ ${price
            ? price.toFixed(2).replace(/\./gm, ',')
            : 'Sob consulta'}`}
        </p>

        {freeShipping && (
          <p className="card-ship" data-testid="free-shipping">
            <FaBox />
            Frete grátis
          </p>
        )}
        <Link
          className="card-link"
          data-testid="product-detail-link"
          to={ `/product/${id}` }
        >
          Detalhes do produto
        </Link>

        <button
          className="card-add-cart"
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
