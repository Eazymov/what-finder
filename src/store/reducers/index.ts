// Types
type State = App.State;
//

import { AnyAction, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import actionTypes from '../actionTypes';

function map(state: State = {}, action: AnyAction): State {
  switch (action.type) {
    case actionTypes.SET_MAP:
      return action.payload;
    default:
      return state;
  }
}

function user(state: State = {}, action: AnyAction): State {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state;
  }
}

function place(state: State = {}, action: AnyAction): State {
  switch (action.type) {
    case actionTypes.SET_PLACE:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  map,
  user,
  place,
  routerReducer,
});

export default reducer;
