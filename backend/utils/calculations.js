const ageCalculator = (bday) => {
  const dateDiff = new Date(Date.now() - new Date(bday));
  const years = dateDiff.getFullYear() - 1970
  const months = dateDiff.getMonth();
  return `${years}y${months}m`;
};

module.exports = { ageCalculator };