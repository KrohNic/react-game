import 'materialize-css';
import Board from './components/Board';
import { useDispatch, useSelector } from 'react-redux';
import {createBoard} from './redux/actions'
import { fillSmallBoard } from './utils/boardGenerators'
import Modal from './components/Modal';
import EndGameWindow from './components/EndGameWindow';

function App() {
  const isEndWindow = useSelector(state => state.endWindow.show);
  const dispatch = useDispatch();
  const EndWindow = () => (
    <Modal>
      <EndGameWindow />
    </Modal>
  );

  dispatch(createBoard(fillSmallBoard()));

  console.log('app render', isEndWindow)

  return (
    <>
      {isEndWindow && <EndWindow />}
      <Board/>
    </>
  );
}

export default App;

