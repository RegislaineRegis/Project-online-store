import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RatingStars extends Component {
  render() {
    const { handleRateChange, rate, className } = this.props;
    const checkClass = 'rate-label checked';
    const noCheckClass = 'rate-label';
    const five = 5;
    const four = 4;
    const three = 3;
    return (
      <fieldset className={ className } onChange={ handleRateChange }>
        <label
          className={ rate === five ? checkClass : noCheckClass }
          data-testid="5-rating"
          role="presentation"
          htmlFor="five"
          name="rate"
        >
          <input
            className="input-radio"
            type="radio"
            id="five"
            value="5"
            checked={ rate === five }
          />
          ★
        </label>
        <label
          className={ rate >= four ? checkClass : noCheckClass }
          data-testid="4-rating"
          role="presentation"
          htmlFor="four"
          name="rate"
        >
          <input
            className="input-radio"
            type="radio"
            id="four"
            value="4"
            checked={ rate === four }
          />
          ★
        </label>
        <label
          className={ rate >= three ? checkClass : noCheckClass }
          data-testid="3-rating"
          role="presentation"
          htmlFor="three"
          name="rate"
        >
          <input
            className="input-radio"
            type="radio"
            id="three"
            value="3"
            checked={ rate === three }
          />
          ★
        </label>
        <label
          className={ rate >= 2 ? checkClass : noCheckClass }
          data-testid="2-rating"
          role="presentation"
          htmlFor="two"
          name="rate"
        >
          <input
            className="input-radio"
            type="radio"
            id="two"
            value="2"
            checked={ rate === 2 }
          />
          ★
        </label>
        <label
          className={ rate >= 1 ? checkClass : noCheckClass }
          data-testid="1-rating"
          role="presentation"
          htmlFor="one"
          name="rate"
        >
          <input
            className="input-radio"
            type="radio"
            id="one"
            value="1"
            checked={ rate === 1 }
          />
          ★
        </label>
      </fieldset>
    );
  }
}

RatingStars.propTypes = {
  handleRateChange: PropTypes.func,
  rate: PropTypes.number.isRequired,
  className: PropTypes.string,
};

RatingStars.defaultProps = {
  handleRateChange: null,
  className: 'rating',
};
