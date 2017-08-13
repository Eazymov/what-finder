// Types
type AuthProvider = firebase.auth.AuthProvider;
type AuthMethod = App.AuthMethod;
type AuthData = App.AuthData;
type JSXElement = JSX.Element;
//

import * as React from 'react';
import { Component } from 'react';

import base from '../../base';
import Storage from '../../Storage';
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
  public state = {
    expanded: false
  };

  constructor (props: Props) {
    super(props);
  }

  render (): JSX.Element {
    const expanded: boolean = this.state.expanded;
    const user: User = this.props.user;
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
        {this.renderUserbar(user, expanded)}
      </div>
    );
  }

  private renderUserbar = (user: User, expanded: boolean): JSXElement => {
    const onClick = user ? this.logout : this.toggleList;
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
            <div className="user__info">
              <span className="user__info--name">{user.name}</span>
              <span className="user__info--email">{user.email}</span>
            </div>
          </div>
          : <span>You aren't logged in</span> }
        {loginButton}
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

  private logout = (): void => {
    Storage.removeUser();

    this.props.setUser(null);
  }

  private toggleList = (): void => {
    const expanded = !this.state.expanded;

    this.setState({ expanded });
  }
}

export default ToolbarComponent;
