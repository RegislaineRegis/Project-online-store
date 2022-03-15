import React from 'react';
import PropTypes from 'prop-types';

export default class InputRadio extends React.Component {
  render() {
    const { id, text, childComp } = this.props;
    return (
      <label className="checkout-label" htmlFor={ id }>
        <input
          className="checkout-radio"
          type="radio"
          name="pay-method"
          id={ id }
        />
        {text}
        { childComp }
      </label>
    );
  }
}

InputRadio.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  childComp: PropTypes.node,
};

InputRadio.defaultProps = {
  childComp: '',
};
