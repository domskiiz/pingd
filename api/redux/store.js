import {createStore} from 'redux';
import initSubscriber from 'redux-subscriber';
import {root} from './reducers/root';

export const initialState = {
    contacts: {
        byId: {},
        allIds: [],
    },
};

export const store = createStore(root);
export const subscribe = initSubscriber(store);
