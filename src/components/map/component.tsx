// Types
type MapCoords = App.MapCoords;
//

import * as React from 'react';
import { Component } from 'react';
import { RouterProps } from 'react-router';

import GoogleMap from '../../models/Map';
import Storage from '../../models/Storage';

import AppLoader from '../loader';
// import { history } from '../../router';
import './style.styl';

interface Props extends RouterProps {
  setMap: Function;
}

interface State {
  showLoader: boolean;
}

class MapComponent extends Component<Props, State> {
  public state = {
    showLoader: true,
  };

  private map: GoogleMap;
  private element: Element;
  private initialCoords: MapCoords | null;

  constructor (props: Props) {
    super(props);
  }

  render () {
    return (
      <section id="map-holder">
        <div id="Map" ref={map => map && (this.element = map)} />
        <AppLoader show={this.state.showLoader} />
      </section>
    );
  }

  componentWillMount (): void {
    const routeCoords = this.getRouteCoords();
    const lastCoords = Storage.getLastCoords();

    const coords: MapCoords | null = routeCoords || lastCoords;

    this.initialCoords = coords;
  }

  componentDidMount (): void {
    this.createMap();
    this.setMapCoords();

    window.onbeforeunload = this.beforeDestroy;
  }

  private beforeDestroy = (): void => {
    const coords = this.map.getCoords();

    Storage.setLastCoords(coords);
  }

  private getRouteCoords = (): MapCoords | null => {
    // const params = history.location.pathname.match.arguments;

    return null;
    /* const coords = params.coords;
    const parsedCoords = coords.slice(1).split(',');
    const [lat, lng, zoom] = parsedCoords.map(parseFloat);

    return {
      center: { lat, lng },
      zoom: zoom
    }; */
  }

  private createMap = (): void => {
    const map: GoogleMap = new GoogleMap(this.element);

    this.map = map;
    this.props.setMap(map);

    map.addListener('idle', this.hideLoader);
  }

  private setMapCoords = (): void => {
    const { map, initialCoords } = this;

    if (initialCoords) {
      return map.setCoords(initialCoords);
    }

    map.setCoordsByDefault();
  }

  private hideLoader = (): void => {
    this.setState({ showLoader: false });
  }
}

export default MapComponent;
