import fetch from 'node-fetch';
import { curry } from 'lodash';

import { search } from './util/search';
import { filterResults } from './util/filterResults'
import { fuzzyMatch } from './util/fuzzyMatch'

export const statusHandler = (req, res, next) => {
  res.send(200, 'OK')
  next();
}

export const searchHandler = curry((DATA_URI, req, res, next) => {
  console.log('search', `${DATA_URI} term ${req.params.term} lat ${req.params.lat} lng ${req.params.lng}`);
  
  search(DATA_URI, req.params.lat, req.params.lng)
  .then(filterResults(req.params.term))
  .then(fuzzyMatch(req.params.term))
  .then(results => {
    res.json(results);
  })
  .catch(error => {
    res.send(500,`${error}`);
  });
  
  next();

  
});
