/**
 * Types
 */
type MapCoords = App.MapCoords;

interface State {
  showLoader: boolean;
}

interface Props extends RouteProps<{coords?: string}> {
  setMap: Function;
}
/* *** */

import React, { Component } from 'react';
import { RouteComponentProps as RouteProps } from 'react-router';

import { history } from 'router';
import GoogleMap from 'models/Map';
import Storage from 'shared/Storage';
import AppLoader from 'shared/loader';

class MapComponent extends Component<Props, State> {
  public state = {
    showLoader: true,
  };

  private map: GoogleMap;
  private element: Element;
  private initialCoords?: MapCoords;

  constructor (props: Props) {
    super(props);
  }

  render (): JSX.Element {
    return (
      <div id="Map" ref={map => map && (this.element = map)}>
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
    const map: GoogleMap = new GoogleMap(this.element);

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
    const params = this.props.match.params;
    const oldCoords: string = params.coords || '';
    const newCoords: string = this.map.getParamString();
    const oldUrl: string = window.location.pathname;
    const newUrl: string = oldUrl.replace(oldCoords, newCoords);

    history.push(newUrl);
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

export default MapComponent;
