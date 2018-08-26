import {createStore, applyMiddleware} from 'redux';

// Redux-persist
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

// Middlewares
import logger from 'redux-logger';
import thunk from 'redux-thunk';


const config = {
    key: 'root',
    storage,
};

const persistedReducer = persistCombineReducers(config, rootReducer);

export default function configureStore() {
    let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
    let persistor = persistStore(store);

    return {store, persistor};
}
