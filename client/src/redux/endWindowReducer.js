import {SHOW_END_WINDOW, HIDE_END_WINDOW} from './types';

const initialState = {
  show: false,
  title: ''
};

const endWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_END_WINDOW: 
      return {...state, endWindow: true, title: action.payload}
    case HIDE_END_WINDOW: 
      return {...state, endWindow: false}
    default: return state
  }
}

export default endWindowReducer;