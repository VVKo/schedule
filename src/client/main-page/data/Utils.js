const APIs = {
  rozkladChNU_API:
    'https://script.google.com/macros/s/AKfycbz9TGybKSdfNecmU7-8_nWFn5sPSwNX6Ly2D9tSdIxy8WwrusVvLYR0B3c9oUfMoRo/exec',
  driver_API:
    'https://script.google.com/macros/s/AKfycbzPGSRA_iPCjt5IwrgY4AxPuCoKuP5gofysbI79ovilw_vob9UeHMD1ZzZoVicUhoA1/exec',
};

const getData = async url => {
  const response = await fetch(url);
  return await response.json();
};

export default getData;
