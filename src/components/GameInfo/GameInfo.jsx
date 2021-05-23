import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseTime } from '../../store/game/gameActions';
import './GameInfo.scss';

const GameInfo = () => {
  const bombsLeft = useSelector((state) => state.game.bombsLeft);
  const time = useSelector((state) => state.game.time);
  const isGameStarted = useSelector((state) => state.game.isGameStarted);
  const isGameEnded = useSelector((state) => state.app.isGameEnded);
  const dispatch = useDispatch();
  const [timeInterval, setTimeInterval] = useState(null);
  const timeFormatted = String(time).padStart(3, '0');

  useEffect(() => {
    if (!isGameStarted) return;

    let interval = setInterval(() => {
      dispatch(increaseTime());
    }, 1000);

    setTimeInterval(interval);

    return () => clearInterval(interval);
  }, [dispatch, isGameStarted]);

  useEffect(() => {
    if (isGameEnded) {
      clearInterval(timeInterval);
    }
  }, [dispatch, isGameEnded, timeInterval]);

  return (
    <div className='info'>
      <span>
        Bombs:&nbsp;
        <b>{bombsLeft}</b>
      </span>
      <span>
        Time:&nbsp;
        <b>{timeFormatted}</b>
      </span>
    </div>
  );
};

export default GameInfo;
