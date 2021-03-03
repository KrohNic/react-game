import React from 'react';
import { useSelector } from 'react-redux';
import Board from './components/Board';
import Modal from './components/Modal';
import EndGameWindow from './components/EndGameWindow';
import GameInfo from './components/GameInfo/GameInfo';
import Storage from './components/Storage';
import LoadSavePrompt from './components/LoadSavePrompt/LoadSavePrompt';
import 'materialize-css';

function App() {
  const isEndWindow = useSelector((state) => state.endWindow.isGameEnded);
  const isLoadPrompt = useSelector((state) => state.endWindow.loadPrompt);
  const EndGameModal = () => (
    <Modal>
      <EndGameWindow />
    </Modal>
  );

  return (
    <>
      {isEndWindow && <EndGameModal />}
      {isLoadPrompt && <LoadSavePrompt />}
      <Storage />
      <GameInfo />
      <Board />
    </>
  );
}

export default App;
