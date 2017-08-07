import { AnyAction } from 'redux';

import actionTypes from '../actionTypes';

import places = google.maps.places;

export function setMap(map: App.GoogleMap): AnyAction {
  return {
    type: actionTypes.SET_MAP,
    payload: map
  };
}

export function setUser(user: App.User): AnyAction {
  return {
    type: actionTypes.SET_USER,
    payload: user
  };
}

export function setPlace(place: places.PlaceResult): AnyAction {
  return {
    type: actionTypes.SET_PLACE,
    payload: place
  };
}
