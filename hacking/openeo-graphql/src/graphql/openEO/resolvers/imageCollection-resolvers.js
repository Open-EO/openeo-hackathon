import save from 'save-file';

export const imageCollectionResolvers = ({ OpenEO } = {}) => {

  return {
    Mutation: {
      imageCollection: async (_, args) => {
          let imageCollectionNode = await OpenEO.ImageCollection.create(args.collectionId);
          
          if(args.bbox) {
            //TODO better validation (maybe with a custom bbox graphql scalar type)
            imageCollectionNode = await imageCollectionNode.filter_bbox(args.bbox.left, args.bbox.top, args.bbox.right, args.bbox.bottom, args.bbox.srs);
          }

          if(args.time) {
            //TODO better validation (maybe with a custom bbox graphql scalar type)
            imageCollectionNode = await imageCollectionNode.filter_daterange(args.time.start, args.time.end);
          }

          if(args.ndvi) {
            //TODO better validation (maybe with a custom bbox graphql scalar type)
            imageCollectionNode = await imageCollectionNode.NDVI(args.ndvi.red, args.ndvi.nir);
          }

          if(args.maxTime) {
            //TODO better validation (maybe with a custom bbox graphql scalar type)
            imageCollectionNode = await imageCollectionNode.max_time();
          }

          if(args.minTime) {
            //TODO better validation (maybe with a custom bbox graphql scalar type)
            imageCollectionNode = await imageCollectionNode.min_time();
          }

          const blob = await imageCollectionNode.execute(args.outputFormat, args.outputArgs);
          
          //TODO:  saves only corrupted images :(
          //await save(blob, `../${Date.now()}.${args.outputFormat}`);
          
          return { job: 'executed' };          
      },
    }
  };
};
