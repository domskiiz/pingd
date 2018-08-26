import {combineReducers} from 'redux';
import screensReducer from './app/Screens/ducks/reducers';
import contactsReducer from './app/ImportAndSelectContactsPage/ducks/reducers';

const rootReducer = combineReducers({
    appState: screensReducer,
    contacts: contactsReducer,
});

export default rootReducer;