import { createStore } from 'redux';
import reducer from './reducers';

const initialState: object = {};

const Store = createStore(reducer, initialState);

export default Store;
