
const fetch = require('node-fetch');

let status;

fetch('https://unstats.un.org/SDGAPI/v1/sdg/Series/List')
  .then((res) => { 
    status = res.status; 
    return res.json() 
  })
  .then((jsonData) => {
    for (var i = jsonData.length - 1; i >= 0; i--) {
      for (var j = jsonData[i].indicator.length - 1; j>= 0; j--) {
        if (jsonData[i].indicator[j].substr(0,1) == '4')
        {console.log(jsonData[i].code);}
      }
    }
    // console.log(status);
  })
  .catch((err) => {
    // handle error for example
    // console.error(err);
  });



function findElement(arr, key, searchValue) {
  let r = false;
  for (var i = 0; i < arr.length; i++){
    if (arr[i][key] == searchValue){
       r = arr[i];
    }
  }
  return r;
}