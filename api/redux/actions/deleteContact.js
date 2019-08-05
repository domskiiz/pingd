export const DELETE_CONTACT = 'DELETE_CONTACT';

export default function deleteContact(phone) {
  return {
    type: DELETE_CONTACT,
    payload: {
      phone,
    },
  };
}
