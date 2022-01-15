const convertJsonToDot = (obj, parent = [], keyValue = {}) => {
  for (let key in obj) {
    let keyPath = [...parent, key];
    if (obj[key] !== null && typeof obj[key] === 'object') {
      Object.assign(keyValue, convertJsonToDot(obj[key], keyPath, keyValue));
    } else {
      keyValue[keyPath.join('.')] = obj[key];
    }
  }
  return keyValue;
}

module.exports = { convertJsonToDot };