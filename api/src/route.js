import {statusHandler, searchHandler} from './handlers';

export default (server, DATA_URI) => {
  server.get('/__health', statusHandler);
  server.get('/search/:term/:lat/:lng/', searchHandler(DATA_URI));
};
