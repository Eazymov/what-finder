import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setPlace } from 'store/actions';

import Component from './component';

import PlaceResult = google.maps.places.PlaceResult;

interface StateToProps {
  map: App.GoogleMap | null;
}

interface DispatchToProps {
  setPlace: Function;
}

const mapStateToProps = (state: App.State) => ({
  map: state.map
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPlace: (place: PlaceResult) => dispatch(setPlace(place))
});

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Component);
