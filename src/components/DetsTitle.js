import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DetsTitle extends Component {
  render() {
    const { title, acceptsMercadopago } = this.props;
    return (
      <section className="dets-title-sect">
        <h1
          className="dets-title"
          data-testid="product-detail-name"
        >
          {title}
        </h1>
        {acceptsMercadopago && <img className="dets-merc-pago" src="https://selectra.net.br/sites/selectra.net.br/files/styles/article_hero/public/images/mercado-pago-825x293.png?itok=rla5wE_U" alt="Aceita MercadoPago" />}
      </section>
    );
  }
}

DetsTitle.propTypes = {
  title: PropTypes.string.isRequired,
  acceptsMercadopago: PropTypes.bool.isRequired,
};
