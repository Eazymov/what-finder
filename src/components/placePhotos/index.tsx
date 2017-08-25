/**
 * Types
 */

type PlacePhoto = google.maps.places.PlacePhoto;

interface Props {
  photos: PlacePhoto[];
}
/* *** */

import React, { Component } from 'react';

import './style';

class PlacePhotos extends Component<Props, {}> {
  constructor (props: Props) {
    super(props);
  }

  render (): JSX.Element {
    const photos = this.props.photos;

    return (
      <div className="photos">
        { photos.map((photo: PlacePhoto, index: number) => {
            const photoOptions = { maxWidth: 150, maxHeight: 100 };

            return (
              <span key={index} className="photo">
                <img src={photo.getUrl(photoOptions)} alt="Photo" />
              </span>
            );
        }) }
      </div>
    );
  }
}

export default PlacePhotos;