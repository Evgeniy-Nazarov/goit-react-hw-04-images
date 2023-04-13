import React, { Component } from 'react';

export default class Button extends Component {



  render() {
    return (
      <button type="button" className="button-load-more" onClick={() =>this.props.onClick()} >
        Load more
      </button>
    );
  }
}