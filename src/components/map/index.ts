import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { setMap } from '../../store/actions';

import component from './component';

const mapStateToProps = (state: App.State) => ({
  map: state.map
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setMap: (map: App.GoogleMap) => dispatch(setMap(map))
});

export default connect<{}, {}, {}>(
  mapStateToProps,
  mapDispatchToProps
)(component);