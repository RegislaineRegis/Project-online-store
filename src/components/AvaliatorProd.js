import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/AvaliatorProd.css';
import * as saveEvaluations from '../services/saveEvaluations';
import Evals from './Evals';
import RatingStars from './RatingStars';

export default class AvaliatorProd extends Component {
  constructor() {
    super();
    this.state = {
      rate: 0,
      email: '',
      evalue: '',
      disabled: true,
      evaluations: [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { id } = this.props;
    const { rate, email, evalue } = this.state;
    const newEval = { id: Math.random(), prod: id, email, evalue, rate };
    this.setState((prevSt) => ({
      rate: 0,
      email: '',
      evalue: '',
      disabled: true,
      evaluations: [...prevSt.evaluations, newEval],
    }));
    saveEvaluations.saveEvaluation(id, newEval);
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
    const { rate, email, evalue, disabled } = this.state;
    const { id } = this.props;
    return (
      <div>
        <form>
          <input
            data-testid="product-detail-email"
            id="input-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="E-mail"
          />
          <RatingStars rate={ rate } handleRateChange={ this.handleRateChange } />
          <textarea
            className="dets-eval"
            name="evalue"
            value={ evalue }
            data-testid="product-detail-evaluation"
            id="comment"
            placeholder="Insira um comentário sobre a avaliação:"
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="submit"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Salvar
          </button>
        </form>
        <Evals id={ id } />
      </div>
    );
  }
}

AvaliatorProd.propTypes = {
  id: PropTypes.string.isRequired,
};
