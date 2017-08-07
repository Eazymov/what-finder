import { AnyAction, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import State = App.State;
import actionTypes from '../actionTypes';

function mapReducer(state: State = {}, action: AnyAction): State {
  switch (action.type) {
    case actionTypes.SET_MAP:
      return action.payload;
    default:
      return state;
  }
}

function userReducer(state: State = {}, action: AnyAction): State {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state;
  }
}

function placeReducer(state: State = {}, action: AnyAction): State {
  switch (action.type) {
    case actionTypes.SET_PLACE:
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  mapReducer,
  userReducer,
  placeReducer,
  routerReducer
});

export default reducer;
