import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from '../../redux/actions';

const EndGameWindow = () => {
  const title = useSelector(state => state.endWindow.title);
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(newGame())

  return (
    <div>
      <h2>{title}</h2>

      <button
        onClick={clickHandler}
        className="waves-effect waves-light btn-large"
      >
        Next game
      </button>
    </div>
  )
}

export default EndGameWindow;