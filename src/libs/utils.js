const addressTranslator = (a) => {
  let address = '';
  if (a?.houseNo) { address += `${a.houseNo}, ` }
  if (a?.street) { address += `${a.street}, ` }
  if (a?.landmark) { address += `${a.landmark}, ` }
  if (a?.area) { address += `${a.area}, >` }
  if (a?.district) { address += `${a.district}, ` }
  if (a?.state) { address += `${a.state}, ` }
  if (a?.country) { address += `${a.country} - ` }
  if (a?.postalCode) { address += `${a.postalCode}` }
  return address;
}

const nameTranslator = (n) => {
  let name = `${n?.designation} ${n?.name?.firstName} ${n?.name?.middleName} ${n?.name?.lastName}`;
  return name;
}

module.exports = { addressTranslator, nameTranslator };