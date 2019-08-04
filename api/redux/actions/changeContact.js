export const CHANGE_DAYS = 'CHANGE_DAYS';

export default function changeDays(phone, changeType) {
  return {
    type: CHANGE_DAYS,
    payload: {
      phone,
      changeType,
    },
  };
}
