import { connect } from 'react-redux';
import component from './component';
import { Dispatch, Action, bindActionCreators } from 'redux';

import { setPlace } from 'Actions';

interface StateToProps {
  place: App.Place | null;
}

interface DispatchToProps {
  setPlace: Function;
}

const mapStateToProps = (state: App.State) => ({
  place: state.place
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPlace: bindActionCreators(setPlace, dispatch)
});

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(component);
