import 'materialize-css';
import Board from './components/Board';
import { connect } from 'react-redux';
import {createBoard} from './redux/actions'
import { fillSmallBoard } from './utils/boardGenerators'

function App(props) {
  props.createBoard(fillSmallBoard());

  return (
    <Board/>
  );
}

const mapDispatchToProps = {
  createBoard
};

export default connect(null, mapDispatchToProps)(App);
