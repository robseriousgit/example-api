import restify from 'restify';
import db from './util/db';
import route from './route';

const {
  DATABASE_NAME = 'example.sqlite3',
  PORT = '1234'
} = process.env;

const server = restify.createServer();

route(server, db(DATABASE_NAME));

server.listen(parseInt(PORT, 10), () => {
  console.log(`${server.name} listening at ${server.url}`);
});

export default server;