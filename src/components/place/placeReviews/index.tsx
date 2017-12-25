import './style'

import React from 'react'

import PlaceReview from './placeReview'
import PlaceAvgRate from './placeAvgRate'
import ScrollBox from 'Components/common/scrollbox'

import { withBem } from 'Utils/decorators'
import { Review, BemProps } from 'Types'

interface Props {
  reviews: Review[]
}

const PlaceReviews = (props: Props & BemProps): JSX.Element => {
  const { reviews, bem } = props
  const { block, element } = bem

  return (
    <div className={block()}>
      <div className={element('title')}>
        <h3>Reviews</h3>
      </div>
      <PlaceAvgRate reviews={reviews} />
      <ScrollBox className={element('list')} color="#2196f3">
        <ul>
          {reviews.map((review: Review, index: number) => (
            <PlaceReview key={index} review={review} />
          ))}
        </ul>
      </ScrollBox>
    </div>
  )
}

export default withBem<Props>('reviews')(PlaceReviews)
