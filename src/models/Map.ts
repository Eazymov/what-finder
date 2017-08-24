// Types
type MapOptions = google.maps.MapOptions;
type MapCoords = App.MapCoords;
type PlaceResult = google.maps.places.PlaceResult;
//

import { GMap } from 'Shared/mapsAPI';
import Storage from 'Shared/Storage';

const geolocation = window.navigator.geolocation;

class GoogleMap extends GMap {
  constructor (element: Element, params?: MapOptions) {
    super(element, params);
  }

  public setCoordsByDefault = (): void => {
    this.setCoords(Storage.defaultCoords);
  }

  public setPlace (place: PlaceResult): void {
    const { address_components } = place;
    const { location } = place.geometry;
    const zoom = Math.round(address_components.length * 1.65) + 6;

    this.setCenter(location);
    this.setZoom(zoom);
  }

  public getUserLocation () {
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

  public setUserLocation () {
    return new Promise((resolve, reject) => {
      const successCallback = (pos: Position): void => {
        const coords = pos.coords;
        const [lat, lng] = [coords.latitude, coords.longitude];

        this.setCenter({ lat, lng });
        this.setZoom(18);

        resolve();
      };

      this
        .getUserLocation()
        .then(successCallback)
        .catch(reject);
    });
  }

  public setCoords (coords: MapCoords): void {
    this.setCenter(coords.center);
    this.setZoom(coords.zoom);
  }

  public getCoords = (): MapCoords => {
    const { lat, lng } = this.getCenter();
    const center = {
      lat: lat(),
      lng: lng()
    };
    const zoom = this.getZoom();

    return { center, zoom };
  }
}

export default GoogleMap;
