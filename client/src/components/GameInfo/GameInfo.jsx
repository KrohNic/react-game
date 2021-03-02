import React from 'react';
import { useSelector } from 'react-redux';
import './GameInfo.scss';

const GameInfo = () => {
  const bombsLeft = useSelector(state => state.board.bombsLeft);

  return (
    <div className="info">
      <span>
        Bomb:&nbsp;
        <b>{bombsLeft}</b>
      </span>
      <span>
        Time:&nbsp;
        <b>00</b>
      </span>
    </div>
  )
};

export default GameInfo;