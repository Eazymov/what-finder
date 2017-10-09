import * as models from 'Models';

export as namespace App;

export declare type User = models.User;

export declare type GoogleMap = models.Map;

export type Place = google.maps.places.PlaceResult;

export type PlaceReview = google.maps.places.PlaceReview;

export interface Review extends PlaceReview {
  profile_photo_url?: string;
  rating?: number;
  relative_time_description?: string;
  time?: number;
}

export interface State {
  user: User | null;
  map: GoogleMap | null;
  place: Place | null;
  activeZone: string;
}

declare type AuthMethod = {
  name: string;
  provider: firebase.auth.AuthProvider;
}

export declare interface AuthData {
  [key: string]: firebase.User;
}

export declare interface Database extends firebase.app.App {
  authMethods?: Array<AuthMethod>;
}

export declare interface MapCoords {
  center: google.maps.LatLngLiteral
  zoom: number
}