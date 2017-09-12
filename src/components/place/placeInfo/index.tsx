/**
 * Types
 */
type Place = App.Place;

interface Props {
  place: Place;
  active: boolean;
}
/* *** */

import React from 'react';

import PlaceTags from './placeTags';
import PlaceHours from './placeHours';
import PlacePhotos from './placePhotos';

import ScrollBox from 'Shared/scrollbox';

const PlaceInfo = (props: Props): JSX.Element => {
  const place: Place = props.place;
  const phone: string = place.formatted_phone_number;
  const address: string = place.formatted_address;
  const types: string[] = place.types;
  const hours = place.opening_hours;
  const photos = place.photos;
  const active: boolean = props.active;

  return (
    <ScrollBox className={`page info ${active ? 'active' : ''}`}>
      <div>
        <div className="info__title">
          <h3>{address}</h3>
        </div>
        {types && <PlaceTags tags={types} />}
        {hours && <PlaceHours hours={hours} />}
        {phone && (
          <div className="info__phone">
            <i className="material-icons">phone</i>
            <h3>Phone:</h3>
            <span>{phone}</span>
          </div>
        )}
        {photos && <PlacePhotos photos={photos} />}
      </div>
    </ScrollBox>
  );
};

export default PlaceInfo;
