import types from './types';

const addContact = (contact, priority) => {
    return {
        type: types.ADD_CONTACT,
        payload: {
            contact,
            priority,
        },
    };
};

export default {
    addContact,
};