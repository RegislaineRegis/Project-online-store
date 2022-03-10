import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Feito em pair programming com: Victor Reksidler e Pedro Henrique Moura
export default class Search extends Component {
  render() {
    return (
      <div>
        <input type="text" name="query" placeholder="Escreva um termo para sua pesquisa" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to ="/ShoppingCart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
      </div>
    );
  }
}

// Requisito 2 feito por Pedro Henrique Moura e Jaziel da Conceição Silva