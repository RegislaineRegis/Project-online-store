import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

class ImagesProdDets extends React.Component {
  render() {
    const { pictures, picIndex, title, zoom, prevPic, nextPic, zoomImg } = this.props;
    return (
      <section className="imgDetails">
        {pictures.length > 0 && (
          <FaChevronLeft
            className="prev-pic"
            onClick={ prevPic }
          />
        )}
        <img
          onClick={ zoomImg }
          role="presentation"
          className={ `dets-active-img ${zoom ? 'zoom-img' : ''}` }
          src={ pictures[picIndex] && pictures[picIndex].url }
          alt={ `${title} - foto ${picIndex + 1}` }
        />
        {pictures.length > 0 && (
          <FaChevronRight
            className="next-pic"
            onClick={ nextPic }
          />
        )}
      </section>
    );
  }
}

ImagesProdDets.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    }),
  ).isRequired,
  picIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  zoom: PropTypes.bool.isRequired,
  prevPic: PropTypes.func.isRequired,
  nextPic: PropTypes.func.isRequired,
  zoomImg: PropTypes.func.isRequired,
};

export default ImagesProdDets;
