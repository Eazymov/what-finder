/**
 * Types
 */

type Div = HTMLDivElement;
type Place = App.Place;
type PlacesService = google.maps.places.PlacesService;
type PlaceServiceStatus = google.maps.places.PlacesServiceStatus;

interface RouteProps {
  placeId?: string;
}

interface Props extends RouteComponentProps<RouteProps> {
  place: Place | null;
  setPlace: Function;
}
/* *** */

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import PlaceTags from './placeTags';
import PlaceHours from './placeHours';
import PlacePhotos from './placePhotos';

import { GPlacesService, GPlacesServiceStatus } from 'Shared/mapsAPI';

class PlaceDescriptionComponent extends Component<Props, {}> {
  constructor (props: Props) {
    super(props);
  }
  
  render (): JSX.Element {
    const place: Place | null = this.props.place;

    if (!place) {
      return (<div className="place" />);
    }

    const types = place.types;
    const hours = place.opening_hours;
    const phone = place.formatted_phone_number;
    const photos = place.photos;

    return (
      <div className="place">
        <h1 className="place__title">{place.formatted_address}</h1>
        {types && <PlaceTags tags={types} />}
        {hours && <PlaceHours hours={hours} />}
        {phone && (
          <div className="place__phone">
            <i className="material-icons">phone</i>
            <h3>Phone:</h3>
            <span>{phone}</span>
          </div>
        )}
        {photos && <PlacePhotos photos={photos} />}
      </div>
    );
  }

  /* shouldComponentUpdate (newProps: Props): boolean {
    const shouldUpdate: boolean = Boolean(newProps.place) && this.needUpdate;

    if (shouldUpdate) {
      this.loadPlaceData();
    }

    return shouldUpdate;
  } */

  componentWillMount (): void {
    this.loadPlaceData();
  }
  
  private get needUpdate (): boolean {
    const place: Place | null = this.props.place;
    const routePlaceId = this.props.match.params.placeId;
    const propsPlaceId = place ? place.place_id : undefined;

    if (!routePlaceId) {
      return false;
    }

    if (!propsPlaceId) {
      return true;
    }
    
    return propsPlaceId !== routePlaceId;
  }

  private loadPlaceData (): void {
    const placeId = this.props.match.params.placeId;
    const element: Div = document.createElement<'div'>('div');

    if (!this.needUpdate) {
      return;
    }
    if (!placeId) {
      return;
    }

    const service: PlacesService = new GPlacesService(element);

    service.getDetails({ placeId }, this.setPlace);
  }

  private setPlace = (place: Place, status: PlaceServiceStatus): void => {
    if (status !== GPlacesServiceStatus.OK) {
      return;
    }

    document.title = `${place.formatted_address} - What Finder`;

    this.props.setPlace(place);
  }
}

export default PlaceDescriptionComponent;