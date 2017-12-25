import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'

import GoogleMap from 'Models/GoogleMap'
import Storage from 'Utils/Storage'
import AppLoader from 'Components/common/loader'
import { replaceRouteCoords } from 'Utils/router'
import { MapCoords } from 'Types'

interface State {
  showLoader: boolean
}

interface RouteParams {
  coords?: string
}

interface Props extends RouteComponentProps<RouteParams> {
  setActiveZone: (zone: string) => void
  setMap: (map: GoogleMap) => void
}

class GoogleMapComponent extends Component<Props, State> {
  public state = {
    showLoader: true,
  }

  private map: GoogleMap
  private element: Element
  private initialCoords?: MapCoords

  public render (): JSX.Element {
    return (
      <div
        id="Map"
        ref={map => map && (this.element = map)}
        onClick={() => this.props.setActiveZone('map')}
      >
        <AppLoader show={this.state.showLoader} />
      </div>
    )
  }

  public componentWillMount (): void {
    this.setInitialCoords()
  }

  public componentDidMount (): void {
    this.createMap()
    this.setMapCoords()

    window.onbeforeunload = this.beforeDestroy
  }
  
  public shouldComponentUpdate (): boolean {
    const isMounted = !!this.map

    return !isMounted
  }

  private setInitialCoords (): void {
    const routeCoords = this.getRouteCoords()
    const lastCoords = Storage.getLastCoords()

    const coords = routeCoords || lastCoords

    this.initialCoords = coords
  }

  private beforeDestroy = (): void => {
    const coords = this.map.getCoords()

    Storage.setLastCoords(coords)
  }

  private getRouteCoords (): MapCoords | undefined {
    const params = this.props.match.params
    const coords = params.coords

    if (!coords) {
      return
    }

    const parsedCoords = coords.slice(1).split(',')
    const [lat, lng, zoom] = parsedCoords.map(parseFloat)

    return {
      center: { lat, lng },
      zoom: zoom
    }
  }

  private createMap (): void {
    const map: GoogleMap = new GoogleMap(this.element, {
      noClear: true
    })

    this.map = map
    this.props.setMap(map)

    this.declareListeners(map)
  }

  private declareListeners (map: GoogleMap): void {
    const { handleCoordsChange } = this

    map.addListener('dragend', handleCoordsChange)
    map.addListener('zoom_changed', handleCoordsChange)
  }

  private handleCoordsChange = (): void => {
    const coords: MapCoords = this.map.getCoords()
    const oldRoute: string = this.props.location.pathname
    const newRoute: string = replaceRouteCoords(oldRoute, coords)

    this.props.history.replace(newRoute)
  }

  private async setMapCoords () {
    const { map, initialCoords, hideLoader } = this

    if (initialCoords) {
      map.setCoords(initialCoords)

      return hideLoader()
    }

    try {
      await map.setUserLocation()
    } catch (err) {
      map.setCoordsByDefault()
    } finally {
      hideLoader()
    }
  }

  private hideLoader = (): void => {
    this.setState({ showLoader: false })
  }
}

export default GoogleMapComponent
