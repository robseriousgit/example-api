import route from './route';
import restify from 'restify';

const {
  DATA_URI = 'http://localhost:1234',
  PORT = '1235'
} = process.env;

const server = restify.createServer();

route(server, DATA_URI);

server.listen(parseInt(PORT, 10), () => {
  console.log(`${server.name} listening at ${server.url}`);
});

export default server;

