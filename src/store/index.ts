import { createStore, Store } from 'redux';
import reducer from 'Store/reducers';

import initialState from 'Store/initialState';

const store: Store<{}> = createStore(reducer, initialState);

export default store;
