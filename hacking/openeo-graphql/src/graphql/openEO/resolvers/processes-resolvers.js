export const processesResolvers = ({ OpenEO } = {}) => {

  return {
    Query: {
      processes: async (_, args) => {
        if(args.id){
          return [await OpenEO.Processes.getById(args.id)];
        } else {
          return await OpenEO.Processes.get();
        }
      },
    }
  };
};
