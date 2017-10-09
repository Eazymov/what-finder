/**
 * Types
 */
type MapCoords = App.MapCoords;

interface State {
  showLoader: boolean;
}

interface RouteParams {
  coords?: string;
}

interface Props extends RouteProps<RouteParams> {
  setActiveZone: (zone: string) => void;
  setMap: (map: GoogleMap) => void;
}
/* *** */

import React, { Component } from 'react';
import { RouteComponentProps as RouteProps } from 'react-router';
import PropTypes from 'prop-types';

import { history } from 'Router';
import GoogleMap from 'Models/Map';
import Storage from 'Shared/Storage';
import AppLoader from 'Shared/loader';

import { replaceRouteCoords } from 'Utils';

class GoogleMapComponent extends Component<Props, State> {
  static propTypes = {
    setMap: PropTypes.func.isRequired
  };

  public state = {
    showLoader: true,
  };

  private map: GoogleMap;
  private element: Element;
  private initialCoords?: MapCoords;

  constructor (props: Props) {
    super(props);
  }

  public render (): JSX.Element {
    return (
      <div
        id="Map"
        ref={map => map && (this.element = map)}
        onClick={() => this.props.setActiveZone('map')}
      >
        <AppLoader show={this.state.showLoader} />
      </div>
    );
  }

  componentWillMount (): void {
    this.setInitialCoords();
  }

  componentDidMount (): void {
    this.createMap();
    this.setMapCoords();

    window.onbeforeunload = this.beforeDestroy;
  }
  
  shouldComponentUpdate (): boolean {
    const isMounted = !!this.map;

    return !isMounted;
  }

  private setInitialCoords (): void {
    const routeCoords = this.getRouteCoords();
    const lastCoords = Storage.getLastCoords();

    const coords = routeCoords || lastCoords;

    this.initialCoords = coords;
  }

  private beforeDestroy = (): void => {
    const coords = this.map.getCoords();

    Storage.setLastCoords(coords);
  }

  private getRouteCoords (): MapCoords | undefined {
    const params = this.props.match.params;
    const coords = params.coords;

    if (!coords) {
      return;
    }

    const parsedCoords = coords.slice(1).split(',');
    const [lat, lng, zoom] = parsedCoords.map(parseFloat);

    return {
      center: { lat, lng },
      zoom: zoom
    };
  }

  private createMap (): void {
    const map: GoogleMap = new GoogleMap(this.element, {
      noClear: true
    });

    this.map = map;
    this.props.setMap(map);

    this.declareListeners(map);
  }

  private declareListeners (map: GoogleMap): void {
    const { handleCoordsChange } = this;

    map.addListener('dragend', handleCoordsChange);
    map.addListener('zoom_changed', handleCoordsChange);
  }

  private handleCoordsChange = (): void => {
    const coords: MapCoords = this.map.getCoords();
    const oldRoute: string = this.props.location.pathname;
    const newRoute: string = replaceRouteCoords(oldRoute, coords);

    history.replace(newRoute);
  }

  private async setMapCoords () {
    const { map, initialCoords, hideLoader } = this;

    if (initialCoords) {
      map.setCoords(initialCoords);

      return hideLoader();
    }

    try {
      await map.setUserLocation();
    } catch (err) {
      map.setCoordsByDefault();
    } finally {
      hideLoader();
    }
  }

  private hideLoader = (): void => {
    this.setState({ showLoader: false });
  }
}

export default GoogleMapComponent;
