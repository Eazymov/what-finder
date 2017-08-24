import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUser } from 'Actions';

import component from './component';

interface DispatchToProps {
  setUser: Function;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUser: (user: App.User) => dispatch(setUser(user))
});

export default connect<undefined, DispatchToProps, {}>(
  undefined,
  mapDispatchToProps
)(component);