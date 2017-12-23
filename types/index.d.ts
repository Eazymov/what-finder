import { User, GoogleMap } from 'Models'
import firebase from 'firebase/app'

export as namespace App

export type User = User

export type UserInfo = firebase.UserInfo

export type GoogleMap = GoogleMap

export type MapOptions = google.maps.MapOptions

export type Place = google.maps.places.PlaceResult

export type PlaceReview = google.maps.places.PlaceReview

export type PlaceResult = google.maps.places.PlaceResult

export interface Review extends PlaceReview {
  profile_photo_url?: string
  rating?: number
  relative_time_description?: string
  time?: number
}

export interface State {
  user: User | null
  map: GoogleMap | null
  place: Place | null
  activeZone: string
}

export type AuthProvider = firebase.auth.AuthProvider

export type AuthMethod = {
  name: string
  provider: AuthProvider
}

export interface AuthData {
  [key: string]: firebase.User
}

export interface Database extends firebase.app.App {
  authMethods?: Array<AuthMethod>
}

export interface MapCoords {
  center: google.maps.LatLngLiteral
  zoom: number
}
