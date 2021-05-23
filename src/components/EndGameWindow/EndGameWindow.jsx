import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSound from 'use-sound';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { newGame } from '../../store/game/gameActions';
import { descriptionLookup } from '../../constants/difficulty';
import successSound from '../../assets/sound/success.mp3';
import failureSound from '../../assets/sound/failure.mp3';
import Modal from '../Modal';
import './EndGameWindow.scss';
import RecordItem from './RecordItem';

const CLASS_NAME = 'game_end';

const EndGameWindow = () => {
  const dispatch = useDispatch();
  const isWin = useSelector((state) => state.app.isWin);
  const time = useSelector((state) => state.game.time);
  const records = useSelector((state) => state.app.records);
  const volume = useSelector((state) => state.app.volume);
  const [playSuccess, { stop: stopPlaySuccess }] = useSound(successSound, {
    volume,
  });
  const [playFailure, { stop: stopPlayFailure }] = useSound(failureSound, {
    volume,
  });
  const clickHandler = () => dispatch(newGame());

  useEffect(() => {
    if (isWin) playSuccess();
    else playFailure();

    return () => {
      stopPlaySuccess();
      stopPlayFailure();
    };
  }, [isWin, playSuccess, playFailure, stopPlaySuccess, stopPlayFailure]);

  const recordsElemList = records.map(
    ({ isWin, time, size, difficulty, date }) => {
      const data = {
        difficulty: descriptionLookup[difficulty],
        className: `${CLASS_NAME}--li-lose`,
        title: 'lose',
        recordIco: <CloseIcon />,
        time,
        size,
        date,
      };

      if (isWin) {
        data.className = `${CLASS_NAME}--li-win`;
        data.title = 'win';
        data.recordIco = <CheckIcon />;
      }

      return <RecordItem key={date} {...data} />;
    }
  );

  return (
    <Modal>
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
        <ul className={`${CLASS_NAME}--ul`}>{recordsElemList}</ul>

        <button
          onClick={clickHandler}
          className='waves-effect waves-light btn-large'
        >
          Next game
        </button>
      </div>
    </Modal>
  );
};

export default EndGameWindow;
