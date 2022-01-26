const assignPropsVal = (propsArr, data, userData) => {
  propsArr.forEach(prop => {
    if (data[prop]) userData[prop] = data[prop] || userData[prop];
  });
}

const assignPropsBooleanVal = (propsArr, data, userData) => {
  propsArr.forEach(prop => {
    userData[prop] = (prop in data) ? data[prop] : userData[prop];
  });
}

const assignEmptyObj = (propsArr, userData) => {
  propsArr.forEach(prop => {
    if (!userData[prop]) userData[prop] = {};
  });
}

const assignPropsUpload = (propsArr, file, userData) => {
  propsArr.forEach(prop => {
    if (file && file["path"]) userData[prop] = file["path"] || userData[prop];
  });
}

module.exports = { assignPropsVal, assignPropsBooleanVal, assignEmptyObj, assignPropsUpload };