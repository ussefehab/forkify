import { TIMEOUT_SEC } from "./configure"
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  export const AJAX = async function(url ,uploadData=null){
    try {
    const fetchPro = uploadData?
    fetch(url,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(uploadData)
    }):fetch(url);
    
      const res= await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
      const data= await res.json();
      if (!res.ok) throw new Error(`${data.message} (${res.status})`);
      return data;
      } 
      catch (error) {
      throw error;
      }
  };
  /*
export const getJson=async function(url){
  const fetchPro =  fetch(url);


try {
const res= await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
const data= await res.json();
// console.log(res);
// console.log(data);
if (!res.ok) throw new Error(`${data.message} (${res.status})`);
return data;
} 
catch (error) {
throw error;
}
};

export const sendJson=async function(url,uploadData){
try {
const fetchPro =  fetch(url,{
  method:'POST',
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(uploadData)
}
);
const res= await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]);
const data= await res.json();
// console.log(res);
// console.log(data);
if (!res.ok) throw new Error(`${data.message} (${res.status})`);
return data;
} 
catch (error) {
throw error;
}
};*/ 