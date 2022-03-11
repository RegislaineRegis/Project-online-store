import React from 'react';
import PropTypes from 'prop-types';
// requisito 15 - regislaine

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const { id, title, price, thumbnail, shipping } = product;
    const { free_shipping: freeShipping } = shipping;
    return (
      <section id={ id } data-testid="product">
        <h2>{title}</h2>
        <img src={ thumbnail } alt={ title } />
        <p>{`R$ ${price}`}</p>
        {freeShipping && <p data-testid="free-shipping">Frete grátis</p>}
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
