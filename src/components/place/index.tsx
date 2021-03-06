import './style'

/**
 * Types
 */
type Place = App.Place;
type Div = HTMLDivElement;
type PlacesService = google.maps.places.PlacesService;
type PlaceServiceStatus = google.maps.places.PlacesServiceStatus;

interface State {
  loading: boolean;
}

interface Route {
  placeId: string;
}

interface StateToProps {
  activeZone: string;
  place: Place | null;
}

interface DispatchToProps {
  setPlace: (place: Place) => void;
  setActiveZone: (zone: string) => void;
}
/* *** */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch, Action, bindActionCreators } from 'redux';

interface Props extends RouteComponentProps<Route> {
  activeZone: string;
  place: Place | null;
  setPlace: (place: Place) => void;
  setActiveZone: (zone: string) => void;
}

import { setPlace, setActiveZone } from 'Actions';
import { GAPIPlacesService, GAPIPlacesServiceStatus } from 'Utils/GAPI';

import LoaderComponent from 'Components/common/loader';
import PlaceComponent from './component';

class PlaceContainer extends Component<Props, State> {
  state = {
    loading: false
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const { props, state } = this;
    const activeZone: string = props.activeZone;
    const isActive: boolean = activeZone === 'place';
    const place: Place | null = props.place;
    const loading: boolean = state.loading;

    return (
      <div
        className={`place__container ${isActive && 'active'}`}
        onClick={() => props.setActiveZone('place')}
      >
        {
          (loading || !place)
          ? <LoaderComponent width={60} />
          : <PlaceComponent place={place} />
        }
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: Props): void {
    const nextRoute: string = nextProps.match.params.placeId;
    const needReload: boolean = this.placeChanged(nextRoute);

    if (needReload) {
      this.loadPlaceData(nextRoute);
    }
  }

  public componentWillMount(): void {
    const { place, match } = this.props;
    const route = match.params.placeId;
    
    if (!place) {
      this.loadPlaceData(route);
    }
  }

  public shouldComponentUpdate(
    newProps: Props,
    newState: State
  ): boolean {
    const oldActiveZone: string = this.props.activeZone;
    const newActiveZone: string = newProps.activeZone;
    const activeZoneIsChanged: boolean = oldActiveZone !== newActiveZone;

    if (activeZoneIsChanged) {
      return true;
    }

    const newPlace: Place | null = newProps.place;
    const newPlaceId: string = newPlace ? newPlace.place_id : '';
    const placeChanged: boolean = this.placeChanged(newPlaceId);
    const loadingStatus: boolean = this.state.loading;

    return placeChanged || (loadingStatus !== newState.loading);
  }

  private placeChanged(nextRoute: string): boolean {
    const place: Place | null = this.props.place;
    const placeId: string = place ? place.place_id : '';

    if (!placeId) {
      return true;
    }

    return placeId !== nextRoute;
  }
  
  private loadPlaceData (placeId: string): void {
    if (!placeId) {
      return;
    }

    const element: Div = document.createElement<'div'>('div');
    const service: PlacesService = new GAPIPlacesService(element);

    this.setState({ loading: true });
    service.getDetails({ placeId }, this.setPlace);
  }

  private setPlace = (place: Place, status: PlaceServiceStatus): void => {
    if (status !== GAPIPlacesServiceStatus.OK) {
      return;
    }

    this.props.setPlace(place);
    this.setState({ loading: false });
  }
}

const stateToProps = (state: App.State) => ({
  activeZone: state.activeZone,
  place: state.place
});

const dispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPlace: bindActionCreators(setPlace, dispatch),
  setActiveZone: bindActionCreators(setActiveZone, dispatch),
});

export default connect<StateToProps, DispatchToProps, {}>(
  stateToProps,
  dispatchToProps
)(PlaceContainer);
