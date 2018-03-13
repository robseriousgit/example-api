import { curry } from 'lodash';

import { locationSearchQuery } from './util/queries'

export const statusHandler = (req, res, next) => {
  res.send(200, 'OK')
  next();
}

export const locationSearchHandler = curry((db, req, res, next) => {
  
  try {
    console.log(`Attempting locationSearch lat ${req.params.lat} lng ${req.params.lng}`)
    const query = locationSearchQuery(req.params.lat, req.params.lng)
    const results = db.prepare(query).all();
    res.json(results);
  } catch (err) {
    res.send(500,`${err}`);
  }
  next();
  
});
