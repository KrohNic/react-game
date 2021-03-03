import React from 'react';
import { useSelector } from 'react-redux';
import Board from './components/Board';
import Modal from './components/Modal';
import EndGameWindow from './components/EndGameWindow';
import 'materialize-css';
import GameInfo from './components/GameInfo/GameInfo';
import Storage from './components/Storage';

function App() {
  const isEndWindow = useSelector((state) => state.endWindow.isGameEnded);
  const EndGameModal = () => (
    <Modal>
      <EndGameWindow />
    </Modal>
  );

  return (
    <>
      {isEndWindow && <EndGameModal />}
      <Storage />
      <GameInfo />
      <Board />
    </>
  );
}

export default App;
