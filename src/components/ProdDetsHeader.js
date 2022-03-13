import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle } from 'react-icons/fa';

class ProdDetsHeader extends React.Component {
  render() {
    const { dateCreated, lastUpdated, condition, availableQuantity, status } = this.props;
    const created = dateCreated.split('T')[0].split('-').reverse().join('/');
    const updated = lastUpdated.split('T')[0].split('-').reverse().join('/');
    return (
      <>
        <section>
          <p className="dets-p">{`Criado em: ${created}`}</p>
          <p className="dets-p">{`Ultima atualização: ${updated}`}</p>
          <p className="dets-p">{`Condição: ${condition}`}</p>
        </section>
        <section className="dets-head-side">
          <p className="dets-available">{ `${availableQuantity} und` }</p>
          {status === 'active' && <FaCheckCircle className="dets-check" />}
        </section>
      </>
    );
  }
}

ProdDetsHeader.propTypes = {
  dateCreated: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default ProdDetsHeader;
