import React from 'react';
import PropTypes from 'prop-types';
import { MODAL, MODAL_BG, MODAL_WINDOW } from './classNames';
import './Modal.scss';

const Modal = (props) => {
  return (
    <div className={MODAL}>
      <div className={MODAL_BG} />
      <div className={MODAL_WINDOW}>{props.children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Modal;
