import {statusHandler, locationSearchHandler} from './handlers';

//console.log(test);

export default (server, db) => {
  //console.log(statusHander);
  server.get('/__health', statusHandler);
  server.get('/locationSearch/:lat/:lng', locationSearchHandler(db));
};
