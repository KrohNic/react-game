import React from 'react';
import { useDispatch } from 'react-redux';
import { SAVE_LS_NAME } from '../../constants';
import { restoreGame, showLoadPrompt } from '../../redux/actions';
import Modal from '../Modal';
import './LoadSavePrompt.scss';

const CLASS_NAME = 'load_prompt';

const LoadSavePrompt = () => {
  const dispatch = useDispatch();

  const loadGameHandler = () => {
    const save = localStorage.getItem(SAVE_LS_NAME);

    if (!save) return ;

    const state = JSON.parse(save);

    localStorage.removeItem(SAVE_LS_NAME);
    dispatch(restoreGame(state))
  }

  const newGameHandler = () => {
    localStorage.removeItem(SAVE_LS_NAME);

    dispatch(showLoadPrompt(false));
  }

  return (
    <Modal>
      <h5 className={`${CLASS_NAME}--title`}>
        Would you like to load previous game?
      </h5>
      
      <div className={`${CLASS_NAME}--buttons`}>
        <button
          onClick={loadGameHandler}
          className="waves-effect waves-light btn-large"
        >
          Load
        </button>
        <button
          onClick={newGameHandler}
          className="waves-effect waves-light btn-large"
        >
          New game
        </button>
      </div>
    </Modal>
  )
}

export default LoadSavePrompt;