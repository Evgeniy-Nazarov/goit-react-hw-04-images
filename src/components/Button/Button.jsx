import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { handleLoadMore } = this.props;
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
  }
}

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
