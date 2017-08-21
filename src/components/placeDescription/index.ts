import { connect } from 'react-redux';
import component from './component';

interface StateToProps {
  place: App.Place | null;
}

const mapStateToProps = (state: App.State) => ({
  place: state.place
});

export default connect<StateToProps, undefined, {}>(
  mapStateToProps
)(component);
