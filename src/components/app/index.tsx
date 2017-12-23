import './style.styl'

import React, { Component } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setUser } from 'Actions'

import AppComponent from './component'
import Storage from 'Shared/Storage'
import { User } from 'Types'

interface Props {
  setUser: (user: User) => void
}

class AppContainer extends Component<Props> {
  public componentWillMount (): void {
    const savedUser: User | undefined = Storage.getUser();

    if (savedUser !== undefined) {
      this.props.setUser(savedUser);
    }
  }

  public render (): JSX.Element {
    return (
      <AppComponent />
    )
  }
}

export {
  Props
}

export default connect<undefined, Props, undefined>(
  undefined,
  (dispatch: Dispatch<any>) => bindActionCreators({
    setUser
  }, dispatch)
)(AppContainer)
