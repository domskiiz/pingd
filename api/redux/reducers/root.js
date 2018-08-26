import contacts from './contacts';
import app from './app.js';
import {combineReducers} from 'redux';

const reducers = combineReducers({
    contacts,
    app,
});

export default reducers;
