/**
 * Types
 */
type Place = App.Place;
type Review = App.Review;

interface Props {
  place: Place;
}

interface State {
  activePage: string;
}
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocTitle from 'react-document-title';

import PlaceControls from './placeControls';
import PlaceInfo from './placeInfo';
import PlaceReviews from './placeReviews';

class PlaceComponent extends Component<Props, State> {
  static propTypes = {
    place: PropTypes.object.isRequired
  };

  state = {
    activePage: 'info'
  };

  constructor (props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const place: Place = this.props.place;
    const address: string = place.formatted_address;
    const reviews: Review[] = place.reviews;
    const activePage: string = this.state.activePage;
    const changePage: () => void = this.changePage;

    return (
      <div className="place">
        <DocTitle title={`${address} - What Finder`} />
        {reviews && (
          <PlaceControls
            activePage={activePage}
            changePage={changePage}
          />
        )}
        <PlaceInfo
          place={place}
          active={activePage === 'info'}
        />
        {reviews && <PlaceReviews reviews={reviews} />}
      </div>
    );
  }

  private changePage = (): void => {
    const curPage: string = this.state.activePage;
    const nextPage: string = (curPage === 'info') ? 'reviews' : 'info';

    this.setState({
      activePage: nextPage
    });
  }
}

export default PlaceComponent;
