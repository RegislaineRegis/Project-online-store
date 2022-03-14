import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import EspecificacoesTecnicas from './EspecificacoesTecnicas';

class SpecsEval extends React.Component {
  render() {
    // props a adicionar: show, changeClass, id
    const { attributes } = this.props;
    return (
      <>
        <section className="specs-eval-sect">
          {/* className={ `dets-specs ${show === 'specs' ? show : ''}` }
          onClick={ () => changeClass('specs') }
          role="presentation" */}
          <h3>
            Especificações técnicas
          </h3>
          <EspecificacoesTecnicas attributes={ attributes } />
          {/* className={ `dets-eval ${show === 'eval' ? show : ''}` }
          onClick={ () => changeClass('eval') }
          role="presentation" */}
          <h3>
            Avaliações
          </h3>
        </section>
        {/* {show === 'specs' && <EspecificacoesTecnicas attributes={ attributes } />}
        <section className="eval-sect">
          {show === 'eval' && (
            <Link className="eval-link" to={ `/product/${id}/evaluation/forms` }>
              <button type="button" className="eval-btn">Avaliar produto</button>
            </Link>
          )}
        </section> */}
      </>
    );
  }
}

SpecsEval.propTypes = {
  // id: PropTypes.string.isRequired,
  // show: PropTypes.string.isRequired,
  // changeClass: PropTypes.func.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value_name: PropTypes.string,
    }),
  ).isRequired,
};

export default SpecsEval;
