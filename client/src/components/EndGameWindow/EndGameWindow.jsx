import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from '../../redux/actions';
import './EndGameWindow.scss';

const EndGameWindow = () => {
  const isWin = useSelector(state => state.endWindow.isWin);
  const time = useSelector(state => state.board.time);
  const dispatch = useDispatch();
  const clickHandler = () => dispatch(newGame())

  return (
    <div className="game_end">
      <h2>
        {isWin ? 'You win!' : 'You lose'}
      </h2>
      <p>
        Your time is 
        <b> {time} </b>
        seconds.
      </p>
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