/**
 * Types
 */
type User = App.User;
type State = App.State;

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
import PropTypes from 'prop-types';
import { setUser } from 'Actions';

import Userbar from 'Components/userbar';

class UserbarContainer extends Component<Props, {}> {
  static propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Userbar {...this.props} />
    );
  }
}

const mapStateToProps = (state: State) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUser: (user: User) => dispatch(setUser(user))
});

export default connect<StateToProps, DispatchToProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserbarContainer);
