/**
 * Types
 */

type State = App.State;
/* *** */

import { AnyAction, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  SET_MAP,
  SET_USER,
  SET_PLACE
} from 'ActionTypes';

import initialState from 'Store/initialState';

function map(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
    case SET_MAP:
      return action.payload;
    default:
      return state;
  }
}

function user(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}

function place(state: State = initialState, action: AnyAction): State {
  switch (action.type) {
    case SET_PLACE:
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
