import { SET_STARTED, DECREMENT_BOMBS_LEFT, INCREMENT_BOMBS_LEFT, RESET_BOMBS_LEFT, UPDATE_CELLS} from './types';

const initialState = {
  cells: [],
  bombs: 10,
  bombsLeft: 0,
  started: false
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CELLS: 
      return {...state, cells: action.payload}
    case SET_STARTED: 
      return {...state, started: action.payload}
    case RESET_BOMBS_LEFT: 
      return {...state, bombsLeft: state.bombs}
    case DECREMENT_BOMBS_LEFT: 
      return {...state, bombsLeft: state.bombsLeft - 1}
    case INCREMENT_BOMBS_LEFT: 
      return {...state, bombsLeft: state.bombsLeft + 1}
    default: return state
  }
}

export default boardReducer;