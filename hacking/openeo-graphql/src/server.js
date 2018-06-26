/**
 * @server.js
 *  routing of requests and Koa <-> Graphql
 */

import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import compress from 'koa-compress';
import helmet from 'koa-helmet';
import cors from '@koa/cors';

//graphql imports
import { graphiqlKoa, graphqlKoa } from 'apollo-server-koa';

//subscription imports
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import { createRootSchema } from './graphql/schema';

import { OpenEO } from '@openeo/js-client';
OpenEO.API.baseUrl = 'http://giv-project8.uni-muenster.de';

export const app = new Koa();
const router = new KoaRouter();

const PORT = process.env.GRAPHQL_PORT || 2104;


// create RootSchema and inject dependencies for resolvers;
const rootSchema = createRootSchema({ OpenEO });


// Middlewares
app.use(compress())
   // cors needs to be first!  // TODO use cors only in dev mode
  .use(cors({
    origin: '*'
  }))
  .use(helmet())
  .use(koaBody());

// GRAPHQL routing
router.post('/graphql', graphqlKoa(({ user }) => ({
  schema: rootSchema,
  context: { user },
})));

router.get('/graphql', graphqlKoa(({ user }) => ({
  schema: rootSchema,
  context: { user },
})));

router.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  }),
);

app.use(router.routes())
  .use(router.allowedMethods());

// Wrap the Koa/Express server while passing the server as argument
export const createSubscriptionServer = (server) =>
  new SubscriptionServer({
    execute,
    subscribe,
    schema: rootSchema,
  }, {
    server,
    path: '/subscriptions',
  });