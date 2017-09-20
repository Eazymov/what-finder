/**
 * Types
 */
type PlaceResult = google.maps.places.PlaceResult;

interface Props {
  map: GoogleMap;
  setPlace: Function;
}

interface StateToProps {
  map: GoogleMap | null;
}

interface DispatchToProps {
  setPlace: Function;
}
/* *** */

import React, { Component } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { history } from 'Router';
import PropTypes from 'prop-types';

import { setPlace } from 'Store/actions';
import GoogleMap from 'Models/Map';

import Search from 'Components/search';

class SearchContainer extends Component<Props, {}> {
  static propTypes = {
    map: PropTypes.object,
    setPlace: PropTypes.func.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Search {...this.props} location={history.location} />
    );
  }
}

const mapStateToProps = (state: App.State) => ({
  map: state.map
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPlace: (place: PlaceResult) => dispatch(setPlace(place))
});

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
