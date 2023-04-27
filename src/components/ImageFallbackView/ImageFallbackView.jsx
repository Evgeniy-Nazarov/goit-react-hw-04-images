import PropTypes from 'prop-types';
import errorImage from '../errorImage.jpg';

export const ImageFallbackView = ({ message }) => {
  return (
    <div>
      <img className="image-error" src={errorImage} width="600" alt="error" />
      <p className="text-error">{message}</p>
    </div>
  );
};

ImageFallbackView.propTypes = {
  message: PropTypes.string.isRequired,
};
