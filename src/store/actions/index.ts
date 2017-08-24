// Types
type User = App.User;
type GoogleMap = App.GoogleMap;
type PlaceResult = google.maps.places.PlaceResult;
//

import { AnyAction } from 'redux';

import actionTypes from 'ActionTypes';

export function setMap(map: GoogleMap): AnyAction {
  return {
    type: actionTypes.SET_MAP,
    payload: map,
  };
}

export function setUser(user: User): AnyAction {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
}

export function setPlace(place: PlaceResult): AnyAction {
  return {
    type: actionTypes.SET_PLACE,
    payload: place,
  };
}
