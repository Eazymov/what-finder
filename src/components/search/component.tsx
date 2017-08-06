import * as React from 'react';
import { Component } from 'react';

import { history } from '../../router';
import { GAutocomplete } from '../../mapsAPI';
import GoogleMap from '../../models/Map.js';

import places = google.maps.places;

import './style.styl';

interface MappedProps {
  map: GoogleMap;
  setPlace: Function;
}

class SearchComponent extends Component<MappedProps, {}> {
  private _input: HTMLInputElement;
  private _autocomplete: places.Autocomplete;

  constructor (props: MappedProps) {
    super(props);
  }

  render () {
    return (
      <div className="autocomplete-field">
        <input
          type="text"
          ref={(input: HTMLInputElement) => this._input = input}
          placeholder="Search for any place..."
        />
        <span className="material-icons search-icon">search</span>
      </div>
    );
  }

  componentDidMount () {
    const autocomplete: places.Autocomplete = new GAutocomplete(this._input);

    this._autocomplete = autocomplete;

    autocomplete.addListener('place_changed', this._onSelect);
  }

  private _onSelect = () => {
    const placeInfo: places.PlaceResult = this._autocomplete.getPlace();

    if (!placeInfo.place_id) {
      return;
    }

    const { map, setPlace } = this.props;

    this._correctMap(map, placeInfo);
    this._changeRouteParams(map);

    setPlace(placeInfo);
  }

  private _correctMap = (map: GoogleMap, placeInfo: places.PlaceResult) => {
    const { address_components } = placeInfo;
    const { location } = placeInfo.geometry;
    const zoom = Math.round(address_components.length * 1.65) + 6;

    map.setCenter(location);
    map.setZoom(zoom);
  }

  private _changeRouteParams = (map: GoogleMap) => {
    const { center: { lat, lng }, zoom } = map.getCoords();

    history.push(`/@${lat},${lng},${zoom}`);
  }
}

export default SearchComponent;