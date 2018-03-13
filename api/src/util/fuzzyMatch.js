import { curry } from 'lodash';

const MAX_RESULTS = 20;

// _Plenty_ of results in the sample db were cameras but did not contain 'camera' in description
// Suggest using wikimedia lookup or similar to enhance product metadata
// But for now, just return things that are from camera manufacturers also as a seconday interest array
// using a hardcoded list that could be populated from popular search terms i.e. camera

const fuzzyMatchMagicList = {
  camera: [
    { brand: 'Go Pro' },
    { brand: 'Canon' }
  ]
}

export const fuzzyMatch = curry((term, filteredObject) => {
  return new Promise((resolve, reject) => {
    let secodarilyMatched = []
    if(fuzzyMatchMagicList.hasOwnProperty(term)){
      secodarilyMatched = filteredObject.unmatched.filter((item) => {
          let matchArray = fuzzyMatchMagicList[term].map((matchItem) => {
            return item.item_name.toLowerCase().indexOf(matchItem.brand.toLowerCase()) >= 0
          })
          return matchArray.some((item) => item === true);
        })
        .slice(0, MAX_RESULTS);
    }
    resolve({results: filteredObject.positivelyMatched, secodarilyMatched });
  });
  
});