import * as models from '../models';

export as namespace App;

export type User = models.User;

export type GoogleMap = models.Map;

export interface State {
  user?: User;
  map?: GoogleMap;
}

export interface AuthMethod {
  name: string;
  provider: firebase.auth.AuthProvider;
}

export interface AuthData {
  [key: string]: firebase.User;
}

export interface Database extends firebase.app.App {
  authMethods?: Array<AuthMethod>;
}

export interface MapCoords {
  center: google.maps.LatLng | google.maps.LatLngLiteral
  zoom: number
}