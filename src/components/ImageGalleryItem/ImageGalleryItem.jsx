import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { hits, onClick, updateImg } = this.props;

    return hits.map(hit => (
      <li className="gallery-item" key={hit.id}>
        <img
          className="gallery-item-image"
          src={hit.webformatURL}
          alt={hit.tags}
          onClick={() => {
            onClick();
            updateImg(hit);
          }}
        />
      </li>
    ));
  }
}

ImageGalleryItem.propTypes = {
  hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateImg: PropTypes.func.isRequired,
};
