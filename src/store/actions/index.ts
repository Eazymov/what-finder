// Types
type User = App.User;
type GoogleMap = App.GoogleMap;
type PlaceResult = google.maps.places.PlaceResult;
//

import {
  SET_MAP,
  SET_USER,
  SET_PLACE,
  SET_ACTIVE_ZONE
} from 'ActionTypes';

type ActionType =
  | typeof SET_MAP
  | typeof SET_USER
  | typeof SET_PLACE
  | typeof SET_ACTIVE_ZONE;

export type Action = {
  type: ActionType;
  payload?: any;
};

export const setMap = (map: GoogleMap): Action => ({
  type: SET_MAP,
  payload: map,
});

export const setUser = (user: User): Action => ({
  type: SET_USER,
  payload: user,
});

export const setPlace = (place: PlaceResult): Action => ({
  type: SET_PLACE,
  payload: place,
});

export const setActiveZone = (zone: string): Action => ({
  type: SET_ACTIVE_ZONE,
  payload: zone,
});
