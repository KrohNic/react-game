import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from './components/Board';
import { newGame} from './redux/actions'
import Modal from './components/Modal';
import EndGameWindow from './components/EndGameWindow';
import 'materialize-css';

function App() {
  const isEndWindow = useSelector(state => state.endWindow.show);
  const dispatch = useDispatch();
  const EndGameModal = () => (
    <Modal>
      <EndGameWindow />
    </Modal>
  );

  useEffect(() => dispatch(newGame()), [dispatch]);

  return (
    <>
      {isEndWindow && <EndGameModal />}
      <Board/>
    </>
  );
}

export default App;

