// Types
type User = App.User;
type GoogleMap = App.GoogleMap;
type PlaceResult = google.maps.places.PlaceResult;
//

import { AnyAction } from 'redux';

import { SET_MAP, SET_USER, SET_PLACE } from 'ActionTypes';

export function setMap(map: GoogleMap): AnyAction {
  return {
    type: SET_MAP,
    payload: map,
  };
}

export function setUser(user: User): AnyAction {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function setPlace(place: PlaceResult): AnyAction {
  return {
    type: SET_PLACE,
    payload: place,
  };
}
