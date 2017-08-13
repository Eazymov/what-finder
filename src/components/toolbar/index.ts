import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';

import component from './component';

interface StateToProps {
  user: App.User | undefined;
}

interface DispatchToProps {
  setUser: Function;
}

const mapStateToProps = (state: App.State) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setUser: (user: App.User) => dispatch(setUser(user))
});

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(component);