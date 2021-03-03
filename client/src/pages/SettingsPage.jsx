import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import VolumeMute from '@material-ui/icons/VolumeMute';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useDispatch, useSelector } from 'react-redux';
import { EASY, NORMAL ,HARD } from '../constants/difficulty';
import { MEDIUM, SMALL, LARGE, MEDIUM_WIDTH, LARGE_WIDTH } from '../constants/boardSizes';
import { setBoardSize, setDifficulty, setVolume } from '../redux/actions';
import './SettingsPage.scss';

const CLASS_NAME = 'settings';

export const SettingsPage = () => {
  const dispatch = useDispatch();
  const [isFullScreen, setFullScreen] = useState(false);
  const difficulty = useSelector(state => state.board.bombPerCell)
  const width = useSelector(state => state.board.width)
  const volume = useSelector(state => state.endWindow.volume)
  const volumeMarks = [
    { value: 0, label: 'MUTE' },
    { value: 100, label: 'MAX' },
  ];

  let size;

  switch (width) {
    case MEDIUM_WIDTH:
      size = MEDIUM;
      break;
    case LARGE_WIDTH:
      size = LARGE;
      break;
  
    default:
      size = SMALL;
      break;
  }

  const difficultyHandler = (event) => {
    dispatch(setDifficulty(event.target.value));
  };

  const sizeHandler = (event) => {
    dispatch(setBoardSize(event.target.value));
  };

  const volumeHandler = (_, newValue) => {
    dispatch(setVolume(newValue));
  };

  const fullscreenSwitchHandler = () => {
    if (!isFullScreen) {
      if(document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if(document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if(document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      }
    } else {
      if(document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const fullscreenchangeHandler = () => {
    setFullScreen(!!document.fullscreenElement);
  }

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', fullscreenchangeHandler);
    document.addEventListener('mozfullscreenchange', fullscreenchangeHandler);
    document.addEventListener('fullscreenchange', fullscreenchangeHandler);
    return () => {
      document.removeEventListener('webkitfullscreenchange', fullscreenchangeHandler)
      document.removeEventListener('mozfullscreenchange', fullscreenchangeHandler)
      document.removeEventListener('fullscreenchange', fullscreenchangeHandler)
    }
  }, [])

  return (
    <div className={`${CLASS_NAME}`}>
      <div className={`${CLASS_NAME}--item`}>
        <span className="right">Difficulty:</span>
        <Select
          id="demo-simple-select"
          value={difficulty}
          onChange={difficultyHandler}
        >
          <MenuItem value={EASY}>EASY</MenuItem>
          <MenuItem value={NORMAL}>NORMAL</MenuItem>
          <MenuItem value={HARD}>HARD</MenuItem>
        </Select>
      </div>
      <div className={`${CLASS_NAME}--item`}>
        <span className="right">Size:</span>
        <Select
          id="demo-simple-select"
          value={size}
          onChange={sizeHandler}
        >
          <MenuItem value={SMALL}>{SMALL}</MenuItem>
          <MenuItem value={MEDIUM}>{MEDIUM}</MenuItem>
          <MenuItem value={LARGE}>{LARGE}</MenuItem>
        </Select>
      </div>
      <div className={`${CLASS_NAME}--item`}>
        <span className="right">Volume:</span>
        <div className={`${CLASS_NAME}--volume`}>
          <VolumeMute />
          <Slider 
            value={volume} 
            onChange={volumeHandler} 
            aria-labelledby="discrete-slider-custom"
            valueLabelDisplay="auto"
            marks={volumeMarks}
          />
          <VolumeUp />
        </div>
      </div>
      <div className={`${CLASS_NAME}--item`}>
        <span className="right">Full screen:</span>
          <div className="switch" onClick={fullscreenSwitchHandler}>
            <label>
              Off
              <input
                type="checkbox"
                checked={isFullScreen}
                onChange={fullscreenSwitchHandler}
              />
              <span className="lever"></span>
              On
            </label>
          </div>
      </div>
    </div>
  )
}
