const { upload } = require('./avatarUpload');
const { isNull } = require('./is');
const { convertJsonToDot,  } = require('./conversions');
const { ageCalculator, } = require('./calculations');
const { assignPropsUpload, assignPropsVal, assignEmptyObj, assignPropsBooleanVal } = require('./assignProps');

module.exports = {
  assignEmptyObj,
  assignPropsVal,
  assignPropsBooleanVal,
  assignPropsUpload,
  upload,
  isNull,
  convertJsonToDot,
  ageCalculator,
};