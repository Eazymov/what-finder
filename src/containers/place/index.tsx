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

interface RouteProps {
  placeId: string;
}

interface Props extends RouteComponentProps<RouteProps> {
  place: Place | null;
  setPlace: Function;
}

interface StateToProps {
  place: Place | null;
}

interface DispatchToProps {
  setPlace: Function;
}
/* *** */

import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch, Action, bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { setPlace } from 'Actions';
import { GAPIPlacesService, GAPIPlacesServiceStatus } from 'Shared/GAPI';

import LoaderComponent from 'Shared/loader';
import PlaceComponent from 'Components/place';

class PlaceContainer extends Component<Props, State> {
  static propTypes = {
    place: PropTypes.object,
    setPlace: PropTypes.func.isRequired
  };

  state = {
    loading: false
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const place: Place | null = this.props.place;
    const loading: boolean = this.state.loading;

    return (
      <div className="place__container">
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

const mapStateToProps = (state: App.State) => ({
  place: state.place
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPlace: bindActionCreators(setPlace, dispatch)
});

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(PlaceContainer);