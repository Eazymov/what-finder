/**
 * Types
 */
type Autocomplete = google.maps.places.Autocomplete;
type PlaceResult = google.maps.places.PlaceResult;
/* *** */

import React, { Component } from 'react';

import { history } from 'router';
import { GAutocomplete } from 'shared/mapsAPI';
import GoogleMap from 'models/Map';

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

  componentDidMount () {
    const autocomplete: Autocomplete = new GAutocomplete(this.input);

    this.autocomplete = autocomplete;

    autocomplete.addListener('place_changed', this.onSelect);
  }

  private onSelect = (): void => {
    const placeInfo: PlaceResult = this.autocomplete.getPlace();

    const { map, setPlace } = this.props;

    this.correctMap(map, placeInfo);
    this.changeRouteParams(map);

    setPlace(placeInfo);
  }

  private correctMap = (map: GoogleMap, placeInfo: PlaceResult): void => {
    const { address_components } = placeInfo;
    const { location } = placeInfo.geometry;
    const zoom = Math.round(address_components.length * 1.65) + 6;

    map.setCenter(location);
    map.setZoom(zoom);
  }

  private changeRouteParams = (map: GoogleMap): void => {
    const { center, zoom } = map.getCoords();
    const lat: string = center.lat.toFixed(7);
    const lng: string = center.lng.toFixed(7);

    history.push(`/@${lat},${lng},${zoom}`);
  }
}

export default SearchComponent;