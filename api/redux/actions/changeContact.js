export const CHANGE_DAYS = 'CHANGE_DAYS';

export default function changeDays(phoneNumber, changeType) {
  return {
    type: CHANGE_DAYS,
    payload: {
      phoneNumber,
      changeType,
    },
  };
}
