import React, { Component } from 'react';
import * as api from '../services/api';
import CategoriesButtons from '../components/CategoryButtons';
import Loading from '../components/Loading';
import '../styles/Buttons.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories = async () => {
    const categories = await api.getCategories();
    this.setState({
      categories,
      loading: false,
    });
  }

  handleClick = () => {

  }

  render() {
    const { categories, loading } = this.state;
    return (
      <div>
        <section className="buttons-sect">
          {loading ? <Loading /> : (
            categories.map((cat) => (
              <CategoriesButtons
                key={ cat.id }
                category={ cat.name }
                handleClick={ this.handleClick }
              />
            ))
          )}
        </section>
        <input
          type="text"
          name="query"
          placeholder="Escreva um termo para sua pesquisa"
        />
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}
