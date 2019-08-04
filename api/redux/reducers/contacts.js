import {ADD_CONTACT} from '../actions/addContact';
import {CHANGE_DAYS} from '../actions/changeContact';
const _ = require('lodash');

const initialState = [];

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

        case CHANGE_DAYS:{
          const {payload} = action.payload;

          switch(payload.changeType){
            case 'snooze': {}
            case 'pingd': {}
            default: {}
          }
          
          return contactsState;
        }

        default:
            return contactsState;
    }
}
