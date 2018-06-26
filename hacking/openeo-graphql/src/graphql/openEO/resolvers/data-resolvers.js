export const dataResolvers = ({ OpenEO } = {}) => {

  return {
    Query: {
      data: async (_, args) => {
        if(args.id){
          return [await OpenEO.Data.getById(args.id)];
        } else {
          return await OpenEO.Data.get();
        }
      },
    }
  };
};
