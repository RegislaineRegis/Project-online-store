import React from 'react';
import PropTypes from 'prop-types';

class CategoryButtons extends React.Component {
  render() {
    const { category, handleClick, id } = this.props;
    return (
      <button
        className="cat-button"
        data-testid="category"
        type="button"
        id={ id }
        onClick={ handleClick }
      >
        <p className="btn-text">{category}</p>
      </button>
    );
  }
}

CategoryButtons.propTypes = {
  category: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CategoryButtons;
