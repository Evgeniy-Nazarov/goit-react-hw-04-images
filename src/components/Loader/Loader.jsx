import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default class Loader extends Component {
  render() {
    return (
      <>
        <p className="loading-text">Загружаем</p>
        <TailSpin
          height="200"
          width="200"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={true}
        />
      </>
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
