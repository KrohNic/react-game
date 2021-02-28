import {CREATE_BOARD} from './types';

const initialState = {
  cells: []
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD: 
      return {...state, cells: action.payload}
    default: return state
  }
}

export default boardReducer;