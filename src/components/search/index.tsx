import './style.styl'

import React from 'react'
import { Action, Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'

import Search from './component'

import { setPlace } from 'Store/actions'
import GoogleMap from 'Models/GoogleMap'

import { State } from 'Types'

interface OwnProps extends RouteComponentProps<{}> {}

interface Props extends OwnProps {
  map: GoogleMap | null
  setPlace: Function
}

const SearchContainer = (props: Props): JSX.Element|null => {
  const { map, setPlace: set, location, history } = props

  if (map === null) {
    return null
  }

  return (
    <Search
      map={map}
      setPlace={set}
      location={location}
      history={history}
    />
  )
}

interface StateToProps {
  map: GoogleMap | null
}

interface DispatchToProps {
  setPlace: Function
}

const stateToProps = (state: State) => ({
  map: state.map
})

const dispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  setPlace
}, dispatch)

const connectedComponent = connect<StateToProps, DispatchToProps, OwnProps>(
  stateToProps,
  dispatchToProps
)(SearchContainer)

export default withRouter(connectedComponent)
