import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getEvaluations } from '../services/saveEvaluations';

export default class Evals extends Component {
  render() {
    const { id } = this.props;
    const evaluations = getEvaluations(id);
    return (
      <section>
        { evaluations && evaluations.map(({ email, rate, evalue, id: key }) => (
          <section key={ key }>
            <p>{email}</p>
            <p>{rate}</p>
            <p>{evalue}</p>
          </section>
        ))}
      </section>
    );
  }
}

Evals.propTypes = {
  id: PropTypes.string.isRequired,
};
