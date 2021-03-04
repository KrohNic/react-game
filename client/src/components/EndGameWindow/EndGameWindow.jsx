import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from '../../redux/actions';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {HARD, NORMAL} from '../../constants/difficulty';
import './EndGameWindow.scss';

const CLASS_NAME = "game_end";

const EndGameWindow = () => {
  const dispatch = useDispatch();
  const isWin = useSelector(state => state.endWindow.isWin);
  const time = useSelector(state => state.board.time);
  const records = useSelector(state => state.endWindow.records);
  const clickHandler = () => dispatch(newGame())

  const recordsElemList = records.map(({isWin, time, size, difficulty, date}) => {
    let className = `${CLASS_NAME}--li-lose`;
    let title = "lose";
    let recordIco = <CloseIcon />;
    let difficultyDescription;

    switch (Number(difficulty)) {
      case NORMAL:
        difficultyDescription = 'normal';
        break;
      case HARD:
        difficultyDescription = 'hard';
        break;
    
      default:
        difficultyDescription = 'easy';
        break;
    }

    if(isWin) {
      className = `${CLASS_NAME}--li-win`;
      title = "win";
      recordIco = <CheckIcon />
    }

    return (
      <li key={date} className={className} title={title}>
        {recordIco}
        {` ${time} sec, size: ${size}, difficulty: ${difficultyDescription}, `}
        {`${new Date(date).toLocaleString()}`}
      </li>
    )
  })

  return (
    <div className={CLASS_NAME}>
      <h2 className={`${CLASS_NAME}--title`}>
        {isWin ? 'You win!' : 'You lose'}
      </h2>
      <p>
        Your time is 
        <b> {time} </b>
        seconds.
      </p>
      
      <b>Previous games:</b>
      <ul className={`${CLASS_NAME}--ul`}>
        {recordsElemList}
      </ul>
      
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