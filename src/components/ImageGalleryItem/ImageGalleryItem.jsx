import { Component } from "react";





export default class ImageGalleryItem extends Component {


    render() {
      const { hits, onClick } = this.props;
      

  
  return hits.map(({ id, webformatURL, tags }) => (
    <li className="gallery-item" key={id}>
      <img className="gallery-item-image"  src={webformatURL} alt={tags} onClick={() => onClick()} />
    </li>
  ));
}
}
