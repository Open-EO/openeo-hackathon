/**
 * @schema.js
 *  exports a createRootSchema for combining resolvers and schemas of individual models into one rootSchema, to be consumed by graphql
 */

import { makeExecutableSchema } from 'graphql-tools';

import { fromJS } from 'immutable';

import GraphQLJSON from 'graphql-type-json';
import GraphQLDate from 'graphql-date';

import { dummyType } from "./dummy/dummy-type";
import { dummyResolvers } from "./dummy/dummy-resolvers";


import { openEOtypes } from './openEO/types/types';

import { capabilitiesResolvers } from './openEO/resolvers/capabilities-resolvers';
import { authResolvers } from './openEO/resolvers/auth-resolvers';
import { dataResolvers } from './openEO/resolvers/data-resolvers';
import { processesResolvers } from './openEO/resolvers/processes-resolvers';
import { userResolvers } from './openEO/resolvers/user-resolvers';
import { imageCollectionResolvers } from './openEO/resolvers/imageCollection-resolvers';

// Helper function to merge and combine all Resolvers together
function combineResolvers(resolvers) {
  return fromJS({}).mergeDeep(...resolvers).toJS();
}

/**
 * creates the rootSchema out of imported resolvers and TypeDefinitions. dependencies can be injected and passed to resolvers
 * @param dependencies
 * @returns {GraphQLSchema}
 */
export function createRootSchema(dependencies) {

  const rootSchema = [`
    scalar JSON
    scalar Date

    type Query {
      fetchDummy(id: ID, email: String): Dummy
      fetchDummies(limit: Int, offset: Int, order: String): [Dummy]
      
      auth(user: String!, password: String!, endpoint: String): Auth
      capabilities: Capabilities
      data(id: String): [Data]
      processes(id: String): [Processes]
      user(id: String!): User
    }

    type Mutation {
      createDummy(email: String!): Dummy

      register(password: String!): JSON
      imageCollection(
        collectionId: String!, 
        outputFormat: String!, 
        bbox: JSON, 
        time: JSON, 
        ndvi: JSON, 
        maxTime: Boolean, 
        minTime: Boolean
      ): JSON
    }

    type Subscription {
      dummyAdded(email: String): Dummy

      userRegistered(user: String): JSON
      userLoggedIn(user: String): JSON
    }
    
    schema {
      query: Query
      mutation: Mutation
      subscription: Subscription
    }
  `];

  const rootResolver = {
    JSON: GraphQLJSON,
    Date: GraphQLDate,
  };

  // connect all resolvers and inject dependencies
  const resolvers = combineResolvers([
    rootResolver, 
    

    // TODO better dependency injection ( maybe some kind of currying )
    dummyResolvers(dependencies), 
    capabilitiesResolvers(dependencies), 
    authResolvers(dependencies),
    dataResolvers(dependencies),
    processesResolvers(dependencies),
    userResolvers(dependencies),
    imageCollectionResolvers(dependencies)
  ]);

  return makeExecutableSchema({
    typeDefs: [...rootSchema, dummyType, openEOtypes],
    resolvers,
    logger: { log: e => process.env.NODE_ENV === 'development' && console.log(e) },
  });
}
