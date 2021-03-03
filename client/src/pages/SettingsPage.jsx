import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { EASY, NORMAL ,HARD } from '../constants/difficulty';
import { MEDIUM, SMALL, LARGE } from '../constants/boardSizes';
import Slider from '@material-ui/core/Slider';
import VolumeMute from '@material-ui/icons/VolumeMute';
import VolumeUp from '@material-ui/icons/VolumeUp';
import './SettingsPage.scss';

const CLASS_NAME = 'settings';

export const SettingsPage = () => {
  const [difficulty, setDifficulty] = React.useState(EASY);
  const [size, setSize] = React.useState(SMALL);

  const difficultyHandler = (event) => {
    setDifficulty(event.target.value);
  };

  const sizeHandler = (event) => {
    setSize(event.target.value);
  };


  const [volume, setVolume] = React.useState(100);

  const volumeHandler = (_, newValue) => {
    setVolume(newValue);
  };

  const marks = [
    {
      value: 0,
      label: 'MUTE',
    },
    {
      value: 100,
      label: 'MAX',
    },
  ];

  return (
    <div className={`${CLASS_NAME}`}>
      <div className={`${CLASS_NAME}--item`}>
        <span className="right">Difficulty:</span>
        <Select
          id="demo-simple-select"
          value={difficulty}
          onChange={difficultyHandler}
        >
          <MenuItem value={EASY}>{EASY}</MenuItem>
          <MenuItem value={NORMAL}>{NORMAL}</MenuItem>
          <MenuItem value={HARD}>{HARD}</MenuItem>
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
            marks={marks}
          />
          <VolumeUp />
        </div>
      </div>
    </div>
  )
}
