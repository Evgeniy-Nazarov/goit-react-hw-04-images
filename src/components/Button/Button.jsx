import PropTypes from 'prop-types';

export const Button = ({ handleLoadMore }) => {
  return (
    <button
      type="button"
      className="button-load-more"
      onClick={() => {
        handleLoadMore();
      }}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
