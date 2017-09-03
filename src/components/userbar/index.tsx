/**
 * Types
 */
type User = App.User;

interface Props {
  user: User | null;
  expanded: boolean;
  setUser: (user: User | null) => void;
  toggleList: () => void;
}
/* *** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Storage from 'Shared/Storage';

class Userbar extends Component<Props, {}> {
  static propTypes = {
    user: PropTypes.object,
    expanded: PropTypes.bool.isRequired,
    setUser: PropTypes.func.isRequired,
    toggleList: PropTypes.func.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    const user: User | null = this.props.user;
    const userExists: boolean = Boolean(user);

    return (
      <div className="userbar">
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
        {this.renderButton(userExists)}
      </div>
    );
  }

  private renderButton(userExists: boolean): JSX.Element {
    const expanded: boolean = this.props.expanded;
    const onClick = userExists ? this.logout : this.props.toggleList;
    const buttonText = expanded ? 'Cancel' : 'Log in';
  
    return (
      <button onClick={onClick} className="md-button">
        {userExists ? 'logout' : buttonText}
      </button>
    );
  }

  private logout = (): void => {
    Storage.removeUser();

    this.props.setUser(null);
  }
}

export default Userbar;
