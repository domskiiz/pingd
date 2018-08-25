import {contacts} from './contacts';
import {initialState} from '../store.js';

export function root(state = initialState, action) {
    return {
        contacts: contacts(state.contacts, action),
    };
}
