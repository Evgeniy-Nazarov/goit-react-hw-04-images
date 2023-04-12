export default function ImageGalleryItem({ hits }) {
  return hits.map(({ id, webformatURL, tags }) => (
    <li className="gallery-item" key={id}>
      <img className="gallery-item-image" src={webformatURL} alt={tags} />
    </li>
  ));
}
