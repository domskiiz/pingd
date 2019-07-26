import {ADD_CONTACT} from '../actions/addContact';
const _ = require('lodash');

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
            var uniqueState;

            // Using phone as UID, filter out if modifying instead of adding
            if (newState.length > 1){
              var uniqueState = newState.filter((val, index, arr) => {
                return val.contact.phone != payload.contact.phone;
              });
            }
            else var uniqueState = newState;

            uniqueState.push(payload);

            return uniqueState;
        }

        default:
            return contactsState;
    }
}
