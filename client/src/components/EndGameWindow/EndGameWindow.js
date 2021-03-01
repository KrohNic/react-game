import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideEndWindow } from '../../redux/actions';

const EndGameWindow = () => {
  const title = useSelector(state => state.endWindow.title);
  const dispatch = useDispatch();
  const close = () => dispatch(hideEndWindow());
  
  return (
    <div>
      <h2>{title}</h2>

      <button onClick={close}>Next game</button>
    </div>
  )
}

export default EndGameWindow;