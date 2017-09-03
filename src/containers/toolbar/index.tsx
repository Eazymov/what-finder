/**
 * Types
 */
interface DispatchToProps {
  setUser: Function;
}

interface Props {
  setUser: Function;
}
/* *** */

import React, { Component } from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUser } from 'Actions';

import User from 'Models/User';

import Toolbar from 'Components/toolbar';

class ToolbarContainer extends Component<Props, {}> {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <Toolbar {...this.props} />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUser: (user: User) => dispatch(setUser(user))
});

export default connect<undefined, DispatchToProps, {}>(
  undefined,
  mapDispatchToProps
)(ToolbarContainer);
