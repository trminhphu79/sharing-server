const getResponse = (value = null, message = '') => {
  const result = {};
  if (value) result['value'] = value;
  if (message) result['message'] = message;
  return result
}

module.exports = {
  getResponse
}