import './style.styl'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch, Action, bindActionCreators } from 'redux'
import { RouteComponentProps } from 'react-router'

import GoogleMapComponent from './component'

import { setMap, setActiveZone } from 'Actions'
import { GoogleMap } from 'Types'

interface RouteParams {
  coords?: string
}

interface OwnProps extends RouteComponentProps<RouteParams> {}

interface Props extends OwnProps {
  setActiveZone: (zone: string) => void
  setMap: (map: GoogleMap) => void
}

class GoogleMapContainer extends Component<Props> {
  public render(): JSX.Element {
    return (
      <GoogleMapComponent {...this.props} />
    )
  }
}

const dispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  setMap,
  setActiveZone,
}, dispatch)

export default connect<undefined, Props, OwnProps>(
  undefined,
  dispatchToProps
)(GoogleMapContainer)
