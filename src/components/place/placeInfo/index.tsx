import './style'

import React from 'react'

import PlaceTags from './placeTags'
import PlaceHours from './placeHours'
import PlacePhotos from './placePhotos'
import ScrollBox from 'Components/common/scrollbox'

import { withBem } from 'Utils/decorators'
import { Place, BemProps } from 'Types'

interface Props {
  place: Place
  active: boolean
}

const PlaceInfo = (props: Props & BemProps): JSX.Element => {
  const { block, element } = props.bem
  const place: Place = props.place
  const phone: string = place.formatted_phone_number
  const address: string = place.formatted_address
  const types: string[] = place.types
  const hours = place.opening_hours
  const photos = place.photos
  const active: boolean = props.active

  return (
    <ScrollBox className={block({ active })} color="#2196f3">
      <div className={element('title')}>
        <h3>{address}</h3>
      </div>
      {types && <PlaceTags tags={types} />}
      {hours && <PlaceHours hours={hours} />}
      {phone && (
        <div className={element('phone')}>
          <i className="material-icons">phone</i>
          <h3>Phone:</h3>
          <span>{phone}</span>
        </div>
      )}
      {photos && <PlacePhotos photos={photos} />}
    </ScrollBox>
  )
}

export default withBem<Props>('info')(PlaceInfo)
