import './style.styl'

/**
 * Types
 */
import { User, State } from 'Types'

interface OwnProps {
  expanded: boolean;
  toggleList: () => void;
}

interface Props extends OwnProps {
  user: User;
  setUser: (user: User | null) => void;
}

interface StateToProps {
  user: App.User | null;
}

interface DispatchToProps {
  setUser: Function;
}
/* *** */

import React, { Component } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUser } from 'Actions';

import Userbar from './component';

class UserbarContainer extends Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Userbar {...this.props} />
    );
  }
}

const stateToProps = (state: State) => ({
  user: state.user
});

const dispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUser: (user: User) => dispatch(setUser(user))
});

export default connect<StateToProps, DispatchToProps, OwnProps>(
  stateToProps,
  dispatchToProps
)(UserbarContainer);
