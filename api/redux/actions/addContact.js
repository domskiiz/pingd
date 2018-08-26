export const ADD_CONTACT = 'ADD_CONTACT';

export default function addContact(contact, priority) {
  return {
    type: ADD_CONTACT,
    payload: {
      contact,
      priority,
    },
  };
}
