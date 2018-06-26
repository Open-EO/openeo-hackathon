export const userResolvers = ({ OpenEO } = {}) => {

  return {
    Query: {
      user: async (_, args) => {
        if(args.id){
          const userApi = await OpenEO.Users.getObject(args.id);
          // inject userApi to further resolvers, to prevent unneeded new instances
          return { userApi };
        } else {
          throw new Error('no user id provided')
        }
      },
    },
    User: {
      processGraphs: ({ userApi }) => userApi.getProcessGraphs(),
      jobs: ({ userApi }) => userApi.getJobs(),
      services: ({ userApi }) => userApi.getServices(),
      credits: ({ userApi }) => userApi.getCredits(),
      files: async ({ userApi }) => {
        try{
          const files = await userApi.getFiles();
          return files;
        }catch (err) {
          throw new Error('error fetching files, please try the request again... it should work the second time')
        }
      },
    }
  };
};
