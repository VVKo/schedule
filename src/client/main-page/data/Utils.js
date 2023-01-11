const APIs = {
  rozkladChNU_API:
    'https://script.google.com/macros/s/AKfycbxiawqME4hcUsUq7tVXpEfeiaNWUz3CDiFiiC1U_8k--_3SZe3d1EiUtaazx7crzEI/exec',
  driver_API:
    'https://script.google.com/macros/s/AKfycbzPGSRA_iPCjt5IwrgY4AxPuCoKuP5gofysbI79ovilw_vob9UeHMD1ZzZoVicUhoA1/exec',
};

export const getDataNEW = async (API, action, jsonTxt) => {
  const url = `${APIs[API]}?action=${action}&data=${encodeURIComponent(
    jsonTxt
  )}`;
  const response = await fetch(url);
  return await response.json();
};
const getData = async url => {
  const response = await fetch(url);
  return await response.json();
};

export default getData;
