const capitalize = (s) => (typeof s == "string") ? `${s.slice(0, 1).toUpperCase()}${s.slice(1)}` : s;

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
  let name = '';
  if (n?.designation) {
    name += `${capitalize(n.designation)} `;
  }
  if (n?.name) {
    if (n?.name?.firstName) {
      name += `${capitalize(n.name.firstName)} `;
    }
    if (n?.name?.middleName) {
      name += `${capitalize(n.name.middleName)} `;
    }
    if (n?.name?.lastName) {
      name += `${capitalize(n.name.lastName)}`;
    }
  }
  return name;
}

const arrayTranslator = (a) => {
  if (a) {
    let s = '';
    for (let i of a.slice(0, a.length - 1)) {
      s += `${i}, `
    }
    s += a[a.length - 1]
    return s;
  }
  return a;
}

const imageUrlTranslator = (imageUrl) => {
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const url = `${serverURL}${imageUrl?.replace(/public/g, "")}`;
  return url;
}

const urlTranslator = (...urls) => {
  let currentURL, finalURL = '';
  for(let url of urls) {
    currentURL = (url[0] === '/') ? url.slice(1,): url;
    currentURL = (currentURL[currentURL.length - 1] !== '/') ? `${currentURL}/`: currentURL;
    finalURL += currentURL;
  }
  return finalURL;
}

module.exports = { imageUrlTranslator, urlTranslator, arrayTranslator, capitalize, addressTranslator, nameTranslator };