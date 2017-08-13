import { createStore, Store } from 'redux';
import reducer from './reducers';

import initialState from './initialState';

const store: Store<{}> = createStore(reducer, initialState);

export default store;
