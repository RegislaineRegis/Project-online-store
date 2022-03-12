import React from 'react';
import PropTypes from 'prop-types';

class EspecificacoesTecnicas extends React.Component {
  render() {
    const { attributes } = this.props;
    return (
      <ul>
        {attributes.map((attr) => (
          <li key={ attr.name }>
            <h3>{attr.name}</h3>
            <p>{attr.value_name}</p>
          </li>
        ))}
      </ul>
    )
  }
}

EspecificacoesTecnicas.propTypes = {
  attributes: PropTypes.array.isRequired,
}

export default EspecificacoesTecnicas;