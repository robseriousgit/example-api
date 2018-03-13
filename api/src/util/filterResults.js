import { curry } from 'lodash';

const MAX_RESULTS = 20;

export const filterResults = curry((term, results) => {
  return new Promise((resolve, reject) => {
    let positivelyMatched = []
    let unmatched = []
    if (!term) reject('Search term must be provided');

    if (results.length !== 0) {

      positivelyMatched = results
        .filter((item) => item.item_name.toLowerCase().indexOf(term.toLowerCase()) >= 0)
        .slice(0, MAX_RESULTS);
      unmatched = results
        .filter((item) => item.item_name.toLowerCase().indexOf(term.toLowerCase()) < 0);
    }
    
    resolve({ positivelyMatched, unmatched });
  });
  
});