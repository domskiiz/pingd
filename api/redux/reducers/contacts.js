const _ = require('lodash');

import {ADD_CONTACT} from '../actions/addContact';
import {REMOVE_CONTACT} from '../actions/removeContact';
import {SET_CONTACT_PRIORITY} from '../actions/setContactPriority';

const initialState = [];

// export function contacts(contactsState = initialState, action) {
//   return {
//     byId: byId(contactsState.byId, action),
//     // allIds: allIds(contactsState.allIds, action),
//   };
// }
//
// function byId(byIdState, action) {
//     switch (action.type) {
//         case ADD_CONTACT: {
//             console.log('hereee');
//             const newState = _.cloneDeep(byIdState);
//             const {payload} = action;
//             newState[payload.name] = payload;
//
//             return newState;
//         }
//
//         default:
//             return byIdState;
//     }
// }

// function allIds(allIdState, action) {
//     switch (action.type) {
//       // case ADD_CONTACT:
//       //     const {contact, priority} = action.payload;
//
//         default:
//             return allIdsState;
//     }
// }

export default function contacts(contactsState = initialState, action) {
    switch (action.type) {
        case ADD_CONTACT: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            newState.push(payload);

            return newState;
        }

        case SET_CONTACT_PRIORITY: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            const {contactID, priority} = payload;

            for (let i = 0; i < newState.length; i++) {
                let contact = newState[i];
                if (contact._id === contactID)
                    newState[i]['priority'] = priority;
            }

            return newState;
        }

        case REMOVE_CONTACT: {
            const newState = _.cloneDeep(contactsState);
            const {payload} = action;
            const {contactID} = payload;
            console.log('contact ID:', contactID);

            let finalState = [];
            for (let i = 0; i < newState.length; i++) {
                let contact = newState[i].contact;
                console.log('contact', i, ':', contact);
                if (contact._id !== contactID) {
                    finalState.push(newState[i]);
                } else console.log('match!');
            }

            return finalState;
        }

        default:
            return contactsState;
    }
}
