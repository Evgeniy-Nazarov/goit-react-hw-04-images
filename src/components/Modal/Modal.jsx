import React, { Component } from 'react';
import { createPortal } from 'react-dom';




const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    
    render() {
        const { state: {currentImage} } = this.props;
        return createPortal( <div className="overlay" >
        <div className="modal">
            <img src={currentImage} alt="" />
        </div>
    </div>, modalRoot);


    }
}