const ageCalculator = (bday) => {
  let ageString = "";
  const dateDiff = new Date(Date.now() - new Date(bday));
  const years = dateDiff.getFullYear() - 1970;
  if(years > 0) {
    ageString += `${years} years `
  }
  const months = dateDiff.getMonth();
  if(months > 0) {
    ageString += `${months} months`
  }
  return ageString;
};

module.exports = { ageCalculator };