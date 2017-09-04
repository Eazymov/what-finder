/**
 * Types
 */
type Review = App.Review;

interface Props {
  reviews: Review[];
}
/* *** */

import React, { Component } from 'react';

import PlaceReview from './placeReview';

class PlaceReviews extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  render(): JSX.Element {
    const reviews: Review[] = this.props.reviews;
    console.log(reviews[0]);

    return (
      <div className="page reviews">
        <div className="reviews__title">
          <h3>Reviews</h3>
        </div>
        <ul className="reviews__list">
          {reviews.map((review: Review, index: number) => (
            <PlaceReview key={index} review={review} />
          ))}
        </ul>
      </div>
    );
  }
}

export default PlaceReviews;
