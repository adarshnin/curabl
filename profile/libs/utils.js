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

const ageCalculator = (bday) => {
  const dateDiff = new Date(Date.now() - new Date(bday));
  const years = dateDiff.getFullYear() - 1970
  const months = dateDiff.getMonth();
  return `${years}y${months}m`;
};

module.exports = { convertJsonToDot, ageCalculator };