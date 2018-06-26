/**
 * @index.js
 * Entry point. creates an http Server by using the koa app combined with websocket Subscription
 */

import http from 'http';
import { app, createSubscriptionServer } from './server';

const PORT = process.env.GRAPHQL_PORT || 2104;

const server = http.createServer(app.callback());

server.listen(PORT, () => {
  createSubscriptionServer(server)
});

// hot reloading for development
if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeAllListeners('request', server);
    server.on('request', app.callback());
  });
}

console.log();
console.log();
console.log(`graphQL-server running on: http://localhost:${PORT}`);
console.log(`use graphiQL to play with the api: http://localhost:${PORT}/graphiql`);
