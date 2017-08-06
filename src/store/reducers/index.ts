import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import State = App.State;
import Action = ReduxActions.Action;

function map(state: State = {}, action: Action<string>) {
  switch (action.type) {
    case 'SET_MAP':
      return action.payload;
    default:
      return state;
  }
}

function user(state: State = {}, action: Action<string>) {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
}

function place(state: State = {}, action: Action<string>) {
  switch (action.type) {
    case 'SET_PLACE':
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  map,
  user,
  place,
  router
});

export default reducer;
