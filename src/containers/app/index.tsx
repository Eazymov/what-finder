/**
 * Types
 */
type User = App.User;

interface Props {
  setUser: (user: User) => void;
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

import App from 'Components/app';

class AppContainer extends Component<Props, {}> {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <App {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUser: (user: User) => dispatch(setUser(user))
});

export default connect<undefined, DispatchToProps, {}>(
  undefined,
  mapDispatchToProps
)(AppContainer);