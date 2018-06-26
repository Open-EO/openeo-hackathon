import pubsub from '../../pubsub';
import { withFilter } from 'graphql-subscriptions';

export const authResolvers = ({ OpenEO } = {}) => {

  return {
    Query: {
      auth: async (_, args) => {

        if(args.endpoint) {
          OpenEO.API.baseUrl = args.endpoint;
        }

        // only log in if the user changes
        if(OpenEO.Auth.userId !== args.user || !OpenEO.Auth.isLoggedIn()) {
          try{
            const { user_id, token } = await OpenEO.Auth.login(args.user, args.password);
            pubsub.publish('userLoggedIn', { userLoggedIn: args.user });
            return { user: user_id, token };
          } catch (err) {
            throw new Error('auth failed');
          }
        } else {
          return { user: OpenEO.Auth.userId, token: OpenEO.Auth.token };
        }
      },
    },
    Mutation: {
      async register(_, args) {
        const res = await OpenEO.Auth.register(args.password);
        pubsub.publish('userRegistered', { userRegistered: res.user_id });
        return res;
      },
    },
    Subscription: {
      userRegistered: {
        subscribe: withFilter(
          (_, args) => pubsub.asyncIterator(`userRegistered`),
          (payload, variables) => {
            return true;
            // you could get subscriptions only if the user_id matches for example
            // here it does not make sense though because the username is generated

            // return payload.userRegistered === variables.user;
          },
        ),
      },
      userLoggedIn: {
        subscribe: withFilter(
          (_, args) => pubsub.asyncIterator(`userLoggedIn`),
          (payload, variables) => {
            return !variables.user || payload.userLoggedIn === variables.user;
          },
        ),
      }
    },
    Auth: {
      isLoggedIn: () => OpenEO.Auth.isLoggedIn()
    }
  };
};
