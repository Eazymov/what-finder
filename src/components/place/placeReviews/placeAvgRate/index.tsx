/**
 * Types
 */
type Review = App.Review;

interface Props {
  reviews: Review[];
}
/* *** */

import React, { Component } from 'react';

import Rating from '../rating';

class PlaceAvgRate extends Component<Props, {}> {
  render() {
    const reviews: Review[] = this.props.reviews;
    const reviewsCount: number = reviews.length;
    const avgRating: number = reviews.reduce(
      (prev: number, review: Review) => {
        return (review.rating || 0) + prev;
      },
      0
    ) / reviews.length;

    return (
      <div className="avg-rating">
        <h3 className="avg-rating__title">Average Rating</h3>
        <div className="avg-rating__info">
          <span className="rating-number">{avgRating}</span>
          <Rating rating={avgRating} disabled={true} size={20} />
          <span className="reviews-count">{reviewsCount} reviews</span>
        </div>
      </div>
    );
  }
}

export default PlaceAvgRate;
