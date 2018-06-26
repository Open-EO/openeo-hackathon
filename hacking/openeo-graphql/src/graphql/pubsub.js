/**
 * @pupsub.js
 *  pub sub system for websocket subscriptions in graphql
 */

import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const pubsub = new PubSub();

// const pubsub = new RedisPubSub({
//   //triggerTransform,
//   connection: {
//     host: process.env.REDIS_HOST || 'localhost',
//     port: 6379,
//     retry_strategy: (options) => {
//       // reconnect after
//       return Math.max(options.attempt * 100, 3000);
//     },
//   },
// });

export default pubsub;