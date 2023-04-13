import { Component } from 'react';

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
