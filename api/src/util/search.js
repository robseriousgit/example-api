import escape from 'pg-escape';
import fetch from 'node-fetch';

const escapeParam = (param) => escape('%s', param);

export const search = (DATA_URI, lat, lng) => {
  return new Promise((resolve, reject) => {

    const latEscaped = escapeParam(lat);
    const lngEscaped = escapeParam(lng);
    
    if (isNaN(latEscaped) || isNaN(lngEscaped)){
      reject('Integer lat/lng values must be provided');
    } 

    fetch(`${DATA_URI}/locationSearch/${latEscaped}/${lngEscaped}`)
    .then(response => {
      response.json().then(function(results) { 
        resolve(results);
      })
    })
    .catch(error => {
      reject(error);
    }); 
  })
}

