/**
 * Types
 */
type AuthProvider = firebase.auth.AuthProvider;
type AuthMethod = App.AuthMethod;
type AuthData = App.AuthData;
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserbarContainer from 'Containers/userbar';

import base from 'Shared/base';
import Storage from 'Shared/Storage';
import User from 'Models/User';

interface Props {
  setUser: Function;
}

interface State {
  expanded: boolean;
}

class Toolbar extends Component<Props, State> {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  public state = {
    expanded: false
  };

  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const expanded: boolean = this.state.expanded;
    const authMethods: AuthMethod[] = base.authMethods || [];

    return (
      <div className="toolbar">
        <ul
          className={expanded ? 'expanded' : ''}
        >
          { authMethods.map((method: AuthMethod, index: number) => {
              const { name, provider } = method;
              const url = `/icons/${name}.svg`;
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
              );
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
    base
      .auth()
      .signInWithPopup(provider)
      .then(this.authHandler)
      .catch(console.error);
  }

  private authHandler = (authData: AuthData): void => {
    const [providerData] = authData.user.providerData;

    if (!providerData) {
      return;
    }

    const user = new User(providerData);

    Storage.setUser(user);

    this.props.setUser(user);
    this.setState({ expanded: false });
  }

  private toggleList = (): void => {
    const expanded = !this.state.expanded;

    this.setState({ expanded });
  }
}

export default Toolbar;
