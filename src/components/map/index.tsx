import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { RouterProps } from 'react-router';

import { setMap } from '../../store/actions';

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
  private _map: App.GoogleMap;
  private _element: HTMLDivElement;
  private _initialCoords: App.mapCoords | null;

  constructor (props: Props) {
    super(props);

    this.state = {
      showLoader: true
    };
  }

  render () {
    return (
      <section id="map-holder">
        <div id="Map" ref={map => map && (this._element = map)} />
        <AppLoader show={this.state.showLoader} />
      </section>
    );
  }

  componentWillMount (): void {
    const routeCoords = this._getRouteCoords();
    const lastCoords = Storage.getLastCoords();

    const coords = routeCoords || lastCoords;

    this._initialCoords = coords;
  }

  componentDidMount (): void {
    this._createMap();
    this._setMapCoords();

    window.onbeforeunload = this._beforeDestroy;
  }

  private _beforeDestroy = (): void => {
    const coords = this._map.getCoords();

    Storage.setLastCoords(coords);
  }

  private _getRouteCoords = (): App.mapCoords | null => {
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

  private _createMap = (): void => {
    const map = new GoogleMap(this._element);

    this._map = map;
    this.props.setMap(map);

    map.addListener('idle', this._hideLoader);
  }

  private _setMapCoords = (): void => {
    const { _map, _initialCoords } = this;

    if (_initialCoords) {
      return _map.setCoords(_initialCoords);
    }

    _map.setCoordsByDefault();
  }

  private _hideLoader = (): void => {
    this.setState({ showLoader: false });
  }
}

const mapStateToProps = (state: App.State) => ({
  map: state.map
});

const mapDispatchToProps = (dispatch: Function) => ({
  setMap: (map: App.GoogleMap) => dispatch(setMap(map))
});

const ConnectedMap = connect<{}, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(MapComponent);

export default ConnectedMap;
