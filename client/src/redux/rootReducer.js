import { combineReducers } from "redux";
import boardReducer from "./boardReducer";
import endWindowReducer from "./endWindowReducer";

export const  rootReducer = combineReducers({
  board: boardReducer, 
  endWindow: endWindowReducer
})