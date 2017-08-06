import { GMap } from '../mapsAPI';
import Storage from '../models/Storage';

import MapOptions = google.maps.MapOptions;
import PlaceResult = google.maps.places.PlaceResult;

const geolocation = window.navigator.geolocation;

class GoogleMap extends GMap {
  constructor (element: HTMLDivElement, params?: MapOptions) {
    super(element, params);
  }

  public setCoordsByDefault = (): void => {
    this.setCoords(Storage.defaultCoords);
  }

  public setPlace = (place: PlaceResult): void => {
    const { address_components } = place;
    const { location } = place.geometry;
    const zoom = Math.round(address_components.length * 1.65) + 6;

    this.setCenter(location);
    this.setZoom(zoom);
  }

  public getUserLocation = () => {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      geolocation
        .getCurrentPosition(resolve, reject, options);
    });
  }

  /* setUserLocation = (pos) => {
    const coords = pos.coords;
    const [lat, lng] = [coords.latitude, coords.longitude];

    this.setCenter({ lat, lng });
    this.setZoom(18);
  } */

  public setCoords = (coords: App.mapCoords): void => {
    this.setCenter(coords.center);
    this.setZoom(coords.zoom);
  }

  public getCoords = (): App.mapCoords => {
    const center = this.getCenter();
    const zoom = this.getZoom();

    return { center, zoom };
  }
}

export default GoogleMap;
