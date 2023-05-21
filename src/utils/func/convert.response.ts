export const getResponse = <T>(value: T = null, message = '') => {
  let result: { value: T, message: string } = {
    value: null,
    message: ""
  }
  if (value) result['value'] = value;
  if (message) result['message'] = message;
  return result
}
