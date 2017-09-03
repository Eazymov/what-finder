/**
 * Types
 */
type GoogleMap = App.GoogleMap;

interface RouteParams {
  coords?: string;
}

interface Props extends RouteProps<RouteParams> {
  setMap: (map: GoogleMap) => void;
}

interface DispatchToProps {
  setMap: Function;
}
/* *** */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps as RouteProps } from 'react-router';
import PropTypes from 'prop-types';
import { setMap } from 'Actions';

import GoogleMapComponent from 'Components/googleMap';

class GoogleMapContainer extends Component<Props, {}> {
  static propTypes = {
    setMap: PropTypes.func.isRequired
  };

  constructor(props: Props) {
    super(props);
  }
  
  public render(): JSX.Element {
    return (
      <GoogleMapComponent {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  setMap: (map: GoogleMap) => dispatch(setMap(map))
});

export default connect<undefined, DispatchToProps, {}>(
  undefined,
  mapDispatchToProps
)(GoogleMapContainer);