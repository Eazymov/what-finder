/**
 * Types
 */
type Review = App.Review;

interface Props {
  reviews: Review[];
}
/* *** */

import React, { Component } from 'react';

class PlaceReviews extends Component<Props, {}> {
  render(): JSX.Element {
    const reviews: Review[] = this.props.reviews;

    return (
      <div className="page comments">
        <h3 className="comments__title">Reviews</h3>
        <ul className="comments__reviews">
          {reviews.map((review: Review, index: number) => (
            <li key={index} className="review">
              <a
                className="review__author"
                href={review.author_url}
              >
                {review.author_name}
              </a>
              <p className="review__text">{review.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PlaceReviews;
