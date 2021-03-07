import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import VolumeMute from '@material-ui/icons/VolumeMute';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useDispatch, useSelector } from 'react-redux';
import { EASY, NORMAL, HARD } from '../../constants/difficulty';
import { MEDIUM, SMALL, LARGE } from '../../constants/boardSizes';
import { setVolume } from '../../store/app/appActions';
import { setBoardSize, setDifficulty } from '../../store/game/gameActions';
import { HUNDRED_PERCENT, VOLUME_MARKS } from './constants';
import './SettingsPage.scss';

const CLASS_NAME = 'settings';

const fullscreenSwitchHandler = () => {
  const isFullscreenEnabled =
    document.fullscreenElement ||
    document.mozFullscreenElement ||
    document.webkitFullscreenElement;

  if (!isFullscreenEnabled) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
};

const SettingsPage = () => {
  const dispatch = useDispatch();
  const [isFullScreen, setFullScreen] = useState(false);
  const difficulty = useSelector((state) => state.game.bombPerCell);
  const boardSizes = useSelector((state) => state.game.boardSizes);
  const volume = useSelector((state) => state.app.volume);

  const difficultyHandler = (event) => {
    dispatch(setDifficulty(event.target.value));
  };

  const sizeHandler = (event) => {
    dispatch(setBoardSize(event.target.value));
  };

  const volumeHandler = (_, newValue) => {
    dispatch(setVolume(newValue / HUNDRED_PERCENT));
  };

  const fullscreenchangeHandler = () => {
    setFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener(
      'webkitfullscreenchange',
      fullscreenchangeHandler
    );
    document.addEventListener('mozfullscreenchange', fullscreenchangeHandler);
    document.addEventListener('fullscreenchange', fullscreenchangeHandler);
    return () => {
      document.removeEventListener(
        'webkitfullscreenchange',
        fullscreenchangeHandler
      );
      document.removeEventListener(
        'mozfullscreenchange',
        fullscreenchangeHandler
      );
      document.removeEventListener('fullscreenchange', fullscreenchangeHandler);
    };
  }, []);

  return (
    <div className={`${CLASS_NAME}`}>
      <div className={`${CLASS_NAME}--item`}>
        <span className='right'>Difficulty:</span>
        <Select
          id='demo-simple-select'
          value={difficulty}
          onChange={difficultyHandler}
        >
          <MenuItem value={EASY}>EASY</MenuItem>
          <MenuItem value={NORMAL}>NORMAL</MenuItem>
          <MenuItem value={HARD}>HARD</MenuItem>
        </Select>
      </div>
      <div className={`${CLASS_NAME}--item`}>
        <span className='right'>Size:</span>
        <Select
          id='demo-simple-select'
          value={boardSizes}
          onChange={sizeHandler}
        >
          <MenuItem value={SMALL}>{SMALL.label}</MenuItem>
          <MenuItem value={MEDIUM}>{MEDIUM.label}</MenuItem>
          <MenuItem value={LARGE}>{LARGE.label}</MenuItem>
        </Select>
      </div>
      <div className={`${CLASS_NAME}--item`}>
        <span className='right'>Volume:</span>
        <div className={`${CLASS_NAME}--volume`}>
          <VolumeMute />
          <Slider
            value={volume * HUNDRED_PERCENT}
            onChange={volumeHandler}
            aria-labelledby='discrete-slider-custom'
            valueLabelDisplay='auto'
            marks={VOLUME_MARKS}
          />
          <VolumeUp />
        </div>
      </div>
      <div className={`${CLASS_NAME}--item`}>
        <span className='right'>Full screen:</span>
        <div className='switch' onClick={fullscreenSwitchHandler}>
          <label>
            Off
            <input
              type='checkbox'
              checked={isFullScreen}
              onChange={fullscreenSwitchHandler}
            />
            <span className='lever'></span>
            On
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
