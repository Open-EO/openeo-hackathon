export const capabilitiesResolvers = ({ OpenEO } = {}) => {

  return {
    Query: {
      capabilities: async (_, args) => {
        return {};
      },
    },
    Capabilities: {
      formats: async () => {
        const res = await OpenEO.API.getOutputFormats();
        return { default: res.default, formats: Object.keys(res.formats) }
      },
      services: () => OpenEO.Services.getCapabilities(),
      api: async () => {
        const {rawData } = await OpenEO.API.getCapabilities();
        return rawData;
      }
    }
  };
};
