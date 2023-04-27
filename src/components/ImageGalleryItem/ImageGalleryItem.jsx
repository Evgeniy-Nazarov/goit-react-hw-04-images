import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ hits, onClick, updateImg }) => {
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
};

ImageGalleryItem.propTypes = {
  hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateImg: PropTypes.func.isRequired,
};
