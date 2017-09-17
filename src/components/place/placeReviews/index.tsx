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
import ScrollBox from 'Shared/scrollbox';

import PlaceAvgRate from './placeAvgRate';

class PlaceReviews extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(): boolean {
    return false;
  }

  render(): JSX.Element {
    const reviews: Review[] = this.props.reviews;

    return (
      <div className="page reviews">
        <div className="reviews__title">
          <h3>Reviews</h3>
        </div>
        <PlaceAvgRate reviews={reviews} />
        <ScrollBox className="reviews__list" color="#2196f3">
          <ul>
            {reviews.map((review: Review, index: number) => (
              <PlaceReview key={index} review={review} />
            ))}
          </ul>
        </ScrollBox>
      </div>
    );
  }
}

export default PlaceReviews;
