import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { loadMore } = this.props;
    return (
      <div>
        <button type="button" className="button" onClick={loadMore()}>
          Load more
        </button>
      </div>
    );
  }
}
