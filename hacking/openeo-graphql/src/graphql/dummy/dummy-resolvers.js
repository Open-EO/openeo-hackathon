/**
 * @dummy.resolver.js
 *  controlleresk logic which is triggered, when a graphql request matches an specific query/mutation. The requests can be here enhanced / validated
 *  and passed to corresponding services.
 */

import pubsub from '../pubsub';
import { withFilter } from 'graphql-subscriptions';

import { dummies, findByEmail, add } from './dummy-data';

export const dummyResolvers = ({  }) => {

  return {
    Query: {
      fetchDummy: async (_, args) => {

        if (args.id) {
          return dummies[args.id+1];
        }
        return findByEmail(args.email);
      },
      fetchDummies: async (_, args) => {
        return dummies;
      },
    },
    Mutation: {
      async createDummy(_, args) {
        const dummy = add({ ...args })
        pubsub.publish('dummyAdded', { dummyAdded: dummy });
        return dummy;
      },
    },
    Subscription: {
      dummyAdded: {
        subscribe: withFilter(
          (_, args) => pubsub.asyncIterator(`dummyAdded`),
          (payload, variables) => {
            return payload.dummyAdded.email === variables.email;
          },
        ),
      },
    }
  };
};
