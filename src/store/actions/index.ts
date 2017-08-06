const SET_MAP: string = 'SET_MAP';
const SET_USER: string = 'SET_USER';
const SET_PLACE: string = 'SET_PLACE';

import places = google.maps.places;

export function setMap(map: App.GoogleMap) {
  return {
    type: SET_MAP,
    payload: map
  };
}

export function setUser(user: App.User) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function setPlace(place: places.PlaceResult) {
  return {
    type: SET_PLACE,
    payload: place
  };
}
