import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';

export default class Loader extends Component {
  render() {
    return (
      <>
        <p>Загружаем</p>
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </>
    );
  }
}
