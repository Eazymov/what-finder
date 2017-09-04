/**
 * Types
 */
type Review = App.Review;

interface Props {
  review: Review;
}

interface State {
  showFullText: boolean;
}
/* *** */

import React, { Component } from 'react';

import Rating from './rating';

class PlaceReview extends Component<Props, State> {
  state = {
    showFullText: false
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const review: Review = this.props.review;
    const authorName: string = review.author_name;
    const authorUrl: string = review.author_url;
    const language: string = review.language;
    const rating: number = review.rating || 0;
    const timeAgo: string = review.relative_time_description || '';
    const profilePhotoUrl: string = review.profile_photo_url || '';
    const text: string = review.text;
    const needTrim: boolean = text.length > 110;
  
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
          <Rating rating={rating} disabled={true} />
          <span className="review__timeAgo">{timeAgo}</span>
          <p lang={language} className="review__text">
            {this.formatText(text, needTrim)}
            {needTrim && this.toggleButton}
          </p>
        </div>
      </li>
    );
  }

  private get toggleButton(): JSX.Element {
    const showFullText: boolean = this.state.showFullText;

    return (
      <span
        className="show-more-btn"
        onClick={() => this.setState({
          showFullText: !showFullText
        })}
      >
        {showFullText ? 'Hide' : 'Show'}
      </span>
    );
  }

  private formatText(text: string, needTrim: boolean): string {
    const showFullText: boolean = this.state.showFullText;

    if (showFullText || !needTrim) {
      return text;
    }

    return text.slice(0, 107) + '...';
  }
}

export default PlaceReview;
