import types from './types';
const _ = require('lodash');

const initialState = [];

const contactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_CONTACT: {
            const newState = _.cloneDeep(state);
            const {payload} = action;
            newState.push(payload);

            return newState;
        }

        default:
            return state;
    }
};

export default contactsReducer;