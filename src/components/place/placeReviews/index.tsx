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
      <ScrollBox className="page" color="#2196f3">
        <div className="reviews">
          <div className="reviews__title">
            <h3>Reviews</h3>
          </div>
          <ul className="reviews__list">
            {reviews.map((review: Review, index: number) => (
              <PlaceReview key={index} review={review} />
            ))}
          </ul>
        </div>
      </ScrollBox>
    );
  }
}

export default PlaceReviews;
