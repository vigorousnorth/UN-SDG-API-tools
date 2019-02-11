
const fetch = require('node-fetch');

let status;
let codes = ["SE_INF_DSBL","SE_IMP_FPOF","SE_LGP_ACHIMA","SE_LGP_ACHIRE","SE_NAP_ACHIMA","SE_NAP_ACHIRE","SE_GPI_ICTS","SE_GPI_PART","SE_ADT_FUNS","SE_URP_REAACH","SE_URP_MATACH","SE_TRA_GRDL","SE_SEP_REAACH","SE_SEP_MATACH","SE_SEP_FUNPROF","SE_REA_PROF","SE_MAT_PROF","SE_GPI_TRATEA","SE_GPI_REAACH","SE_GPI_MATACH","SE_GPI_FUNPROF","SE_ADT_ACTS","SE_ACC_SANI","SE_ACC_INTN","SE_ACC_HNWA","SE_ACC_ELEC","SE_ACC_DWAT","SE_ACC_COMP","SE_PRE_GPIPARTN","SE_DEV_ONTRK","SE_PRE_PARTN","SE_ADT_EDUCTRN","DC_TOF_SCHIPSL"];

// Sample url: "https://unstats.un.org/SDGAPI/v1/sdg/Series/GB_XPD_RSDV/GeoAreas"
// For goal 4, codes.length is 33

getData();

async function getData() {

const geoAreas = await fetch("https://unstats.un.org/SDGAPI/v1/sdg/GeoArea/List")
    .then((res) => { 
      status = res.status; 
      return res.json() 
    })
    .then((jsonData) => {
      return jsonData;
    })
    .catch((err) => {
      // handle error for example
      console.error(err);
    });

let promiseArray = [];

for (var i = codes.length; i >= 0; i--) {

  let c = codes[i];

  let uri =  "https://unstats.un.org/SDGAPI/v1/sdg/Series/" + c + '/GeoAreas';

  // console.log(uri);
  promiseArray.push( fetch(uri)
    .then((res) => { 
      status = res.status; 
      return res.json() 
    })
    .then((jsonData) => {
      for (var j = jsonData.length - 1; j >= 0; j--) {
        let row = jsonData[j];
        let country = findElement(geoAreas, 'geoAreaCode',row.geoAreaCode);
        country.reportedTopics ? country.reportedTopics.push(c) : country.reportedTopics = [c];
      }
    })
    .catch((err) => {
      // handle error for example
      console.error(err);
    })
    );

}

// Dump the results as JSON to the console:
Promise.all(promiseArray).then( () => { console.log(JSON.stringify(geoAreas)); }).catch((err) => {
      // handle error for example
      console.error(err);
    });

}


function findElement(arr, key, searchValue) {
  let r = false;
  for (var i = 0; i < arr.length; i++){
    if (arr[i][key] == searchValue){
       r = arr[i];
    }
  }
  return r;
}