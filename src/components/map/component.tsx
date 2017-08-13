// Types
type MapCoords = App.MapCoords;
type JSXElement = JSX.Element;

interface State {
  showLoader: boolean;
}

interface Props extends RouteComponentProps<{coords: string}> {
  setMap: Function;
}
//

import * as React from 'react';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router';

import GoogleMap from '../../models/Map';
import Storage from '../../Storage';

import AppLoader from '../loader';
import './style.styl';

class MapComponent extends Component<Props, State> {
  public state = {
    showLoader: true,
  };

  private map: GoogleMap;
  private element: Element;
  private initialCoords: MapCoords | undefined;

  constructor (props: Props) {
    super(props);
  }

  render (): JSXElement {
    return (
      <section id="map-holder">
        <div id="Map" ref={map => map && (this.element = map)} />
        <AppLoader show={this.state.showLoader} />
      </section>
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
