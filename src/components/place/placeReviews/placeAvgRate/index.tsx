import './style'

import React from 'react'

import Rating from '../rating'

import { getAvg } from 'Utils'
import { Review } from 'Types'

interface Props {
  reviews: Review[]
}

const PlaceAvgRate = (props: Props): JSX.Element => {
  const reviews: Review[] = props.reviews
  const reviewsCount: number = reviews.length
  const rates: number[] = reviews.map(r => r.rating || 0)
  const avgRating: number = getAvg(rates)

  return (
    <div className="avg-rating">
      <h3 className="avg-rating__title">Average Rating</h3>
      <div className="avg-rating__info">
        <span className="rating-number">{avgRating}</span>
        <Rating rating={avgRating} disabled={true} size={20} />
        <span className="reviews-count">{reviewsCount} reviews</span>
      </div>
    </div>
  )
}

export default PlaceAvgRate
