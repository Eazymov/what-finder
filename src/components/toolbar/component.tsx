import * as React from 'react';
import { Component } from 'react';

import AuthProvider = firebase.auth.AuthProvider;

import base from '../../base';
import Storage from '../../models/Storage';
import User from '../../models/User';

import './style.styl';

interface Props {
  setUser: Function;
  user: App.User;
}

interface State {
  expanded: boolean;
}

class ToolbarComponent extends Component<Props, State> {
  constructor (props: Props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  render () {
    const { expanded } = this.state;
    const { user } = this.props;
    const authMethods = base.authMethods || [];
    const { _authenticate, _renderUserbar } = this;

    return (
      <div className="toolbar">
        <ul
          className={expanded ? 'expanded' : ''}
        >
          { authMethods.map((method: App.authMethod, index: number) => {
              const { name, provider } = method;
              const url = `/icons/${name}.svg`;
              const backgroundImage = `url(${url})`;

              return (
                <li
                  key={index}
                  onClick={() => _authenticate(provider)}
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
        {_renderUserbar(user, expanded)}
      </div>
    );
  }

  private _renderUserbar = (user: App.User, expanded: boolean) => {
    const onClick = user ? this._logout : this._toggleList;
    const buttonText = user ? 'logout' : expanded ? 'Cancel' : 'Log in';
    const loginButton = (
      <button onClick={onClick} className="md-button">
        {buttonText}
      </button>
    );

    return (
      <div className="userdata">
        { user ?
          <div className="user">
            <i
              className="user__photo"
              style={{ backgroundImage: `url(${user.photoURL})` }}
            />
            <span className="user__name">{user.name}</span>
          </div>
          : <span>You aren't logged in</span> }
        {loginButton}
      </div>
    );
  }

  private _authenticate = (provider: AuthProvider): void => {
    base
      .auth()
      .signInWithPopup(provider)
      .then(this._authHandler)
      .catch(console.error);
  }

  private _authHandler = (authData: App.authData): void => {
    const [providerData] = authData.user.providerData;

    if (!providerData) {
      return;
    }

    const user = new User(providerData);

    Storage.setUser(user);

    this.props.setUser(user);
    this.setState({ expanded: false });
  }

  private _logout = (): void => {
    Storage.removeUser();

    this.props.setUser(null);
  }

  private _toggleList = (): void => {
    const expanded = !this.state.expanded;

    this.setState({ expanded });
  }
}

export default ToolbarComponent;
