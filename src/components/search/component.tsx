/**
 * Types
 */
type Autocomplete = google.maps.places.Autocomplete;
type PlaceResult = google.maps.places.PlaceResult;
type MapCoords = App.MapCoords;
/* *** */

import React, { Component } from 'react';

import { history } from 'Router';
import { GAutocomplete } from 'Shared/mapsAPI';
import GoogleMap from 'Models/Map';

import { getNewRouteCoords, getNewRoutePlace } from 'Utils';

interface Props {
  map: GoogleMap;
  setPlace: Function;
}

class SearchComponent extends Component<Props, {}> {
  private input: HTMLInputElement;
  private autocomplete: Autocomplete;

  constructor (props: Props) {
    super(props);
  }

  componentDidMount () {
    const autocomplete: Autocomplete = new GAutocomplete(this.input);

    this.autocomplete = autocomplete;

    autocomplete.addListener('place_changed', this.onSelect);
  }

  shouldComponentUpdate (): boolean {
    return false;
  }

  render (): JSX.Element {
    return (
      <div className="autocomplete-field">
        <input
          type="text"
          ref={(input: HTMLInputElement) => this.input = input}
          placeholder="Search for any place..."
        />
        <span className="material-icons search-icon">search</span>
      </div>
    );
  }

  private onSelect = (): void => {
    const placeInfo: PlaceResult = this.autocomplete.getPlace();

    if (!placeInfo.place_id) {
      return;
    }

    const { map, setPlace } = this.props;
    const placeId: string = placeInfo.place_id;

    this.correctMap(map, placeInfo);
    this.changeRouteCoords(map);
    this.changeRoutePlace(placeId);

    setPlace(placeInfo);
  }

  private correctMap = (map: GoogleMap, placeInfo: PlaceResult): void => {
    const { address_components } = placeInfo;
    const { location } = placeInfo.geometry;
    const zoom = Math.round(address_components.length * 1.65) + 6;

    map.setCenter(location);
    map.setZoom(zoom);
  }

  private changeRouteCoords (map: GoogleMap): void {
    const coords: MapCoords = map.getCoords();
    const newUrl: string = getNewRouteCoords(coords);

    history.push(newUrl);
  }

  private changeRoutePlace (placeId: string): void {
    const newUrl: string = getNewRoutePlace(placeId);

    history.push(newUrl);
  }
}

export default SearchComponent;