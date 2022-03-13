import React from 'react';
import PropTypes from 'prop-types';

class EspecificacoesTecnicas extends React.Component {
  render() {
    const { attributes } = this.props;
    return (
      <ul className="specs-sect">
        {attributes.map((attr) => (
          <li className="spec-li" key={ attr.name }>
            <p className="spec-p">
              <span className="spec-attr">{`${attr.name}: `}</span>
              {attr.value_name}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}

EspecificacoesTecnicas.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value_name: PropTypes.string,
    }),
  ).isRequired,
};

export default EspecificacoesTecnicas;
