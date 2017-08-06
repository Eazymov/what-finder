import { connect } from 'react-redux';
import { setPlace } from '../../store/actions';

import Component from './component';

interface StateToProps {
  map: App.GoogleMap | undefined;
}

interface DispatchToProps {
  setPlace: Function;
}

const mapStateToProps = (state: App.State) => ({
  map: state.map
});

const mapDispatchToProps = (dispatch: Function) => ({
  setPlace: (place: google.maps.places.PlaceResult) => dispatch(setPlace(place))
});

export default connect<StateToProps, DispatchToProps, {}>(
  mapStateToProps,
  mapDispatchToProps
)(Component);
