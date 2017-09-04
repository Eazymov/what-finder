/**
 * Types
 */
type Review = App.Review;

interface Props {
  review: Review;
}
/* *** */

import React from 'react';

import Rating from './rating';

const PlaceReview = (props: Props): JSX.Element => {
  const review: Review = props.review;
  const authorName: string = review.author_name;
  const authorUrl: string = review.author_url;
  // const language: string = review.language;
  const rating: number = review.rating || 0;
  const timeAgo: string = review.relative_time_description || '';
  const profilePhotoUrl: string = review.profile_photo_url || '';
  const text: string = review.text;

  return (
    <li className="review">
      <a className="review__avatar" href={authorUrl}>
        <img src={profilePhotoUrl} alt={authorName} />
      </a>
      <div className="review__content">
        <a
          className="review__author"
          href={authorUrl}
        >
          {authorName}
        </a>
        <Rating rating={rating} />
        <span className="review__timeAgo">{timeAgo}</span>
        <p className="review__text">{text}</p>
      </div>
    </li>
  );
}

export default PlaceReview;
