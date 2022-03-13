import React from 'react';
import PropTypes from 'prop-types';
import EspecificacoesTecnicas from './EspecificacoesTecnicas';

class SpecsEval extends React.Component {
  render() {
    const { show, changeClass, attributes } = this.props;
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
        {show === 'eval'}
      </>
    );
  }
}

SpecsEval.propTypes = {
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
