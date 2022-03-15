import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AvaliatorProd.css';
import { Redirect } from 'react-router-dom';
import * as saveEvaluations from '../services/saveEvaluations';
import * as api from '../services/api';
import * as shoppinCart from '../services/saveShoppingCart';
import RatingStars from './RatingStars';
import Header from './Header';

export default class AvaliatorProd extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      rate: 0,
      email: '',
      evalue: '',
      disabled: true,
      evaluations: [],
      saved: false,
      title: '',
      price: 0,
      picture: '',
      cartItems: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getProduct(id);
    this.setState({ id, cartItems: shoppinCart.getShoppingCart() });
  }

  getProduct = async (id) => {
    const response = await api.getProductsDetails(id);
    this.setState({
      title: response.title,
      price: response.price,
      picture: response.pictures.filter((pic) => pic.url)[0] });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { rate, email, evalue, id } = this.state;
    const newEval = { id: Math.random(), prod: id, email, evalue, rate };
    saveEvaluations.saveEvaluation(id, newEval);
    this.setState((prevSt) => ({
      rate: 0,
      email: '',
      evalue: '',
      disabled: true,
      evaluations: [...prevSt.evaluations, newEval],
      saved: true,
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(target.name, target.value);
    this.setState({
      [name]: value,
    }, () => this.validationBtn());
  }

  validationBtn = () => {
    const { rate, email } = this.state;
    const isValid = rate !== 0 && email;
    this.setState({
      disabled: !isValid,
    });
  }

  handleRateChange = ({ target }) => {
    this.setState({
      rate: parseFloat(target.value),
    }, () => this.validationBtn());
  }

  render() {
    const { id, rate, email, evalue, disabled, saved,
      title, price, picture, cartItems } = this.state;
    const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    return (
      <div>
        <Header title="FrontEnd Masters" quantity={ quantity } />
        <section className="eval-form-sect">
          <section className="eval-prod-sect">
            <img src={ picture.url } alt={ title } />
            <section className="title-price-sect">
              <h2>{ title }</h2>
              <p>{ `Preço: R$ ${price}` }</p>
            </section>
          </section>
          <form className="eval-form">
            <section className="eval-from-line">
              <input
                className="rate-input"
                data-testid="product-detail-email"
                id="input-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="E-mail"
              />
              <RatingStars
                className="rating"
                rate={ rate }
                handleRateChange={ this.handleRateChange }
              />
            </section>
            <textarea
              className="rate-textarea"
              name="evalue"
              value={ evalue }
              data-testid="product-detail-evaluation"
              id="comment"
              placeholder="Insira um comentário sobre a avaliação:"
              onChange={ this.handleChange }
            />
            <button
              className="rate-btn"
              data-testid="submit-review-btn"
              type="submit"
              disabled={ disabled }
              onClick={ this.handleSubmit }
            >
              Salvar
            </button>
          </form>
        </section>
        {saved && <Redirect to={ `/product/${id}` } />}
      </div>
    );
  }
}

AvaliatorProd.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
