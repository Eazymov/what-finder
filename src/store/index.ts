import { createStore } from 'redux';
import reducer from './reducers';

import initialState from './initialState';

const Store = createStore(reducer, initialState);

export default Store;
