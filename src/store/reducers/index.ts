import { combineReducers, Reducer } from 'redux';

import {
  SET_MAP,
  SET_USER,
  SET_PLACE,
  SET_ACTIVE_ZONE,
} from 'ActionTypes';
import { Action } from 'Actions';
import { State } from 'Types';

import initialState from 'Store/initialState';

const map = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_MAP:
      return action.payload;
    default:
      return state;
  }
};

const user = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
};

const place = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_PLACE:
      return action.payload;
    default:
      return state;
  }
};

const activeZone = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_ACTIVE_ZONE:
      return action.payload;
    default:
      return state;
  }
};

const reducer: Reducer<State> = combineReducers({
  map,
  user,
  place,
  activeZone,
});

export default reducer;
