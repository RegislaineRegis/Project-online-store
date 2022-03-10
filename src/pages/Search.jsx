import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <div>
        <input type="text" name="query" placeholder="Escreva um termo para sua pesquisa" />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
