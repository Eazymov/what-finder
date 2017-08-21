/**
 * Types
 */

type Place = App.Place;
type PlacePhoto = google.maps.places.PlacePhoto;

interface Props {
  place: Place;
}

interface State {

}
/* *** */

import React, { Component } from 'react';

class PlaceDescriptionComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props);
  }

  render (): JSX.Element {
    const { place } = this.props;

    if (!place) {
      return (<span />);
    }
    console.log(place);

    return (
      <div className="place">
        <h1 className="place__title">{place.formatted_address}</h1>
        <div className="place__photos">
          { place.photos.map((photo: PlacePhoto, index: number) => {
              const photoOptions = { maxWidth: 150, maxHeight: 100 };
              return (
                <span key={index} className="photo">
                  <img src={photo.getUrl(photoOptions)} alt="" />
                </span>
              );
          }) }
        </div>
      </div>
    );
  }
}

export default PlaceDescriptionComponent;