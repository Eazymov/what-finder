import { createStore, Store } from 'redux';
import reducer from 'Store/reducers';
import { State } from 'Types';

import initialState from 'Store/initialState';

const store: Store<State> = createStore(reducer, initialState);

export default store;
