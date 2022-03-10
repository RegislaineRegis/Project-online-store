import React from 'react';
import PropTypes from 'prop-types';

class CategoryButtons extends React.Component {
  render() {
    const { category, handleClick } = this.props;
    return (
      <button
        className="cat-button"
        data-testid="category"
        type="button"
        onClick={ handleClick }
      >
        {category}
      </button>
    );
  }
}

CategoryButtons.propTypes = {
  category: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CategoryButtons;
