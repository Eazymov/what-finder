import * as models from '../models';

import LatLng = google.maps.LatLng;
import LatLngLiteral = google.maps.LatLngLiteral;

export as namespace App;

export type User = models.User;

export type GoogleMap = models.Map;

export interface State {
  user?: User;
  map?: GoogleMap;
}

export type authMethod = {
  name: string;
  provider: firebase.auth.AuthProvider;
};

export type authData = {
  [key: string]: firebase.User
}

export interface Database extends firebase.app.App {
  authMethods?: Array<authMethod>;
}

export type mapCoords = {
  center: LatLng | LatLngLiteral
  zoom: number
};