import errorImage from '../errorImage.jpg';

export default function ImageFallbackView({ message }) {
  return (
    <div>
      <img src={errorImage} width="240" alt="error" />
      <p>{message}</p>
    </div>
  );
}
