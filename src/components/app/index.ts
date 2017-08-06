import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';

import component from './component';

interface DispatchToProps {
  setUser: Function;
}

const mapDispatchToProps = (dispatch: Dispatch<object>) => ({
  setUser: (user: App.User) => dispatch(setUser(user))
});

export default connect<{}, DispatchToProps, {}>(
  mapDispatchToProps
)(component);