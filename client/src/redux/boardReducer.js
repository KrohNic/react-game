import {UPDATE_CELLS} from './types';

const initialState = {
  cells: []
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CELLS: 
      return {...state, cells: action.payload}
    default: return state
  }
}

export default boardReducer;