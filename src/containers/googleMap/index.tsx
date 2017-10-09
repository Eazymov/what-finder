/**
 * Types
 */
type GoogleMap = App.GoogleMap;

interface RouteParams {
  coords?: string;
}

interface Props extends RouteProps<RouteParams> {
  setActiveZone: (zone: string) => void;
  setMap: (map: GoogleMap) => void;
}

interface DispatchToProps {
  setActiveZone: (zone: string) => void;
  setMap: (map: GoogleMap) => void;
}
/* *** */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action, bindActionCreators } from 'redux';
import { RouteComponentProps as RouteProps } from 'react-router';
import PropTypes from 'prop-types';
import { setMap, setActiveZone } from 'Actions';

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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setMap: bindActionCreators(setMap, dispatch),
  setActiveZone: bindActionCreators(setActiveZone, dispatch),
});

export default connect<undefined, DispatchToProps, {}>(
  undefined,
  mapDispatchToProps
)(GoogleMapContainer);