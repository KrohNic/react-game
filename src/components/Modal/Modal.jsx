import React from 'react';
import './Modal.scss';

const Modal = (props) => {
  return (
    <div className="modal--bg">
      <div className="modal--window">
        {props.children}
      </div>
    </div>
  )
}

export default Modal;