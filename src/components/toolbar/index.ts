import { connect } from 'react-redux';
import { setUser } from '../../store/actions';

import Component from './component';

const mapStateToProps = (state: App.State) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Function) => ({
  setUser: (user: App.User) => dispatch(setUser(user))
});

interface StateToProps {
  user: App.User | undefined;
}

interface DispatchToProps {
  setUser: Function;
}

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Component);