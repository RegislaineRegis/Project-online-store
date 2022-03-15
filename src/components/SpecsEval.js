import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as saveEvaluations from '../services/saveEvaluations';
import EspecificacoesTecnicas from './EspecificacoesTecnicas';
import Evals from './Evals';
import RatingStars from './RatingStars';

class SpecsEval extends React.Component {
  constructor() {
    super();
    this.state = {
      evaluations: [],
    }
  }

  componentDidMount() {
    const { id } = this.props;
    this.setState({ evaluations: saveEvaluations.getEvaluations(id) || [] });
  }

  render() {
    const { attributes, id, show, changeClass } = this.props;
    const evaluations = saveEvaluations.getEvaluations(id);
    
    const score = evaluations && evaluations.reduce((acc, { rate }, index, arr) => {
      const length = arr.length - 1;
      if (index < length) return acc + rate;
      return (acc + rate)/(length + 1);
    }, 0);
    console.log(score);
    return (
      <>
        <section className="specs-eval-sect">
          <h3
          className={ `dets-specs ${show === 'specs' ? show : ''}` }
          onClick={ () => changeClass('specs') }
          role="presentation"
          >
            Especificações técnicas
          </h3>
          <h3
          className={ `dets-eval ${show === 'eval' ? show : ''}` }
          onClick={ () => changeClass('eval') }
          role="presentation"
          >
            Avaliações
          </h3>
        </section>
        {show === 'specs' && <EspecificacoesTecnicas attributes={ attributes } />}
        <section className="eval-sect">
          {show === 'eval' && (
            <>
              <p className="eval-score">
                {score && score.toFixed(1)}
                <RatingStars className="rating3" rate={ Math.floor(score) } />
              </p>
              <Link className="eval-link" to={ `/product/${id}/evaluation-forms` }>
                <button type="button" className="eval-btn">Avaliar produto</button>
              </Link>
              <Evals id={ id } />
            </>
          )}
        </section>
      </>
    );
  }
}

SpecsEval.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.string.isRequired,
  changeClass: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value_name: PropTypes.string,
    }),
  ).isRequired,
};

export default SpecsEval;
