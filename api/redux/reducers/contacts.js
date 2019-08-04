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
          let newState = [...contactsState];
          var index = newState.findIndex(obj => obj.contact.phone === action.payload.phone);

          switch(action.payload.changeType){
            case 'snooze': {
              console.log('Snooze Action Received!');

              // Push back ping date based on priority
              // Set negatives back to 0
              days = Math.max(newState[index].daysUntil,0)
              if (newState[index].priority === 30) newState[index].daysUntil = days + 3;
              else if (newState[index].priority === 90) newState[index].daysUntil = days + 7;
              else if (newState[index].priority === 360) newState[index].daysUntil = days + 14;

              return newState;
            }
            case 'pingd': {
              console.log('Ping Action Received!');

              // Pick a new Ping Date that is > 5 days away
              var newPingDate = Math.floor(Math.random() * newState[index].priority) + 5;
              newState[index].daysUntil = newPingDate;

              return newState;

            }
            default: {}
          }

          return contactsState;
        }

        default:
            return contactsState;
    }
}
