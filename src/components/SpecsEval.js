import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EspecificacoesTecnicas from './EspecificacoesTecnicas';

class SpecsEval extends React.Component {
  render() {
    const { show, changeClass, attributes, id } = this.props;
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
            <Link className="eval-link" to={ `/product/${id}/evaluation/forms` }>
              <button type="button" className="eval-btn">Avaliar produto</button>
            </Link>
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
