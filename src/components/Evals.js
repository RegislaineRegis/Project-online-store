import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEvaluations } from '../services/saveEvaluations';
import RatingStars from './RatingStars';
import '../styles/Evals.css';

export default class Evals extends Component {
  render() {
    const { id } = this.props;
    const evaluations = getEvaluations(id);
    return (
      <section className="evals-sect">
        { evaluations && evaluations.map(({ email, rate, evalue, id: key }) => (
          <section className="eval-card" key={ key }>
            <section className="eval-line">
              <p className="eval-email">{email}</p>
              <RatingStars className="rating2" rate={ rate } />
            </section>
            <p className="dets-eval">{evalue}</p>
          </section>
        ))}
      </section>
    );
  }
}

Evals.propTypes = {
  id: PropTypes.string.isRequired,
};
