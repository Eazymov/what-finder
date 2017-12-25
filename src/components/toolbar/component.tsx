import React, { Component } from 'react'

import UserbarContainer from 'Components/userbar'

import db, { authMethods } from 'Utils/db'
import Storage from 'Utils/Storage'
import User from 'Models/User'

import { AuthProvider, AuthMethod, AuthData } from 'Types'

interface Props {
  setUser: Function
}

interface State {
  expanded: boolean
}

class Toolbar extends Component<Props, State> {
  public state = {
    expanded: false
  };

  render(): JSX.Element {
    const expanded: boolean = this.state.expanded
    const isLocal: boolean = location.hostname === 'localhost'

    return (
      <div className={`toolbar ${expanded ? 'expanded' : ''}`}>
        <ul>
          { authMethods.map((method: AuthMethod, index: number) => {
              const { name, provider } = method;
              const url = `${isLocal ? '' : '/what-finder'}/icons/${name}.svg`;
              const backgroundImage = `url(${url})`;

              return (
                <li
                  key={index}
                  onClick={() => this.authenticate(provider)}
                >
                  <i
                    className="icon"
                    style={{ backgroundImage }}
                  />
                  Log in with <strong>{name}</strong>
                </li>
              )
            }) }
        </ul>
        <UserbarContainer
          expanded={expanded}
          toggleList={this.toggleList}
        />
      </div>
    );
  }

  private authenticate = (provider: AuthProvider): void => {
    db.auth()
      .signInWithPopup(provider)
      .then(this.authHandler)
      .catch(console.error)
  }

  private authHandler = (authData: AuthData): void => {
    const [providerData] = authData.user.providerData

    if (!providerData) {
      return
    }

    const user = new User(providerData)

    Storage.setUser(user)

    this.props.setUser(user)
    this.setState({ expanded: false })
  }

  private toggleList = (): void => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }))
  }
}

export default Toolbar
