import './style.styl'

import React, { Component } from 'react'
import { Action, Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser } from 'Actions'

import Toolbar from './component'

interface Props {
  setUser: Function;
}

class ToolbarContainer extends Component<Props> {
  public render(): JSX.Element {
    return (
      <Toolbar {...this.props} />
    )
  }
}

const dispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  setUser
}, dispatch)

export default connect<undefined, Props, {}>(
  undefined,
  dispatchToProps
)(ToolbarContainer)
