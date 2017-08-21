import { connect } from 'react-redux';
import { setMap } from 'actions';

import component from './component';

interface DispatchToProps {
  setMap: Function;
}

const mapDispatchToProps = (dispatch: Function) => ({
  setMap: (map: App.GoogleMap) => dispatch(setMap(map))
});

export default connect<undefined, DispatchToProps, {}>(
  undefined,
  mapDispatchToProps
)(component);