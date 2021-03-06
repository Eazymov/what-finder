/**
 * Types
 */
type Autocomplete = google.maps.places.Autocomplete
type PlaceResult = google.maps.places.PlaceResult
type MapCoords = App.MapCoords
/* *** */

import React, { Component } from 'react'
import { History, Location } from 'history'

import { GAPIAutocomplete } from 'Utils/GAPI'
import GoogleMap from 'Models/GoogleMap'

import { replaceRouteCoords, replaceRoutePlace } from 'Utils/router'

interface Props {
  map: GoogleMap
  setPlace: Function
  location: Location
  history: History
}

class SearchComponent extends Component<Props, {}> {
  private input: HTMLInputElement
  private autocomplete: Autocomplete

  componentDidMount () {
    const autocomplete: Autocomplete = new GAPIAutocomplete(this.input)

    this.autocomplete = autocomplete

    autocomplete.addListener('place_changed', this.onSelect)
  }

  shouldComponentUpdate (): boolean {
    return false
  }

  public render (): JSX.Element {
    return (
      <div className="autocomplete-field">
        <input
          type="text"
          ref={(input: HTMLInputElement) => this.input = input}
          onFocus={() => this.onFocus()}
          placeholder="Search for any place..."
        />
        <span className="material-icons search-icon">search</span>
      </div>
    )
  }

  private onFocus(): void {
    this.input.select()
  }

  private onSelect = (): void => {
    const placeInfo: PlaceResult = this.autocomplete.getPlace()

    if (!placeInfo.place_id) {
      return
    }

    const { map, setPlace } = this.props
    const placeId: string = placeInfo.place_id
    const coords: MapCoords = map.getCoords()

    this.correctMap(map, placeInfo)
    this.updateRoute(coords, placeId)

    setPlace(placeInfo)
  }

  private correctMap = (map: GoogleMap, placeInfo: PlaceResult): void => {
    const { address_components } = placeInfo
    const { location } = placeInfo.geometry
    const zoom = Math.round(address_components.length * 1.65) + 6

    map.setCenter(location)
    map.setZoom(zoom)
  }

  private updateRoute (coords: MapCoords, placeId: string): void {
    let route: string = this.props.location.pathname
    
    route = replaceRouteCoords(route, coords)
    route = replaceRoutePlace(route, placeId)

    this.props.history.push(route)
  }
}

export default SearchComponent