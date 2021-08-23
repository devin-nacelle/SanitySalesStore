import NacelleSanityPreviewConnector from '@nacelle/sanity-preview-connector'
​
export default ({ app, $config }) => {
  const {
    NACELLE_PREVIEW_MODE,
    SANITY_PROJECT_ID,
    SANITY_DATASET,
    SANITY_TOKEN
  } = process.env
​
  if (NACELLE_PREVIEW_MODE === 'true') {
    // Checks .env file for proper config variables
    if (!SANITY_PROJECT_ID) {
      throw new Error(
        "Couldn't get data from your CMS. Make sure to include SANITY_PROJECT_ID in your .env file"
      )
    }
    if (!SANITY_DATASET) {
      throw new Error(
        "Couldn't get data from your CMS. Make sure to include SANITY_DATASET in your .env file"
      )
    }
    if (!SANITY_TOKEN) {
      throw new Error(
        "Couldn't get data from your CMS. Make sure to include SANITY_TOKEN in your .env file"
      )
    }
​
    // Initialize the Sanity Preview Connector
    const sanityConnector = new NacelleSanityPreviewConnector({
      endpoint: $config.nacelleEndpoint,
      spaceId: $config.nacelleId,
      token: $config.nacelleToken,
      sanityConfig: {
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        token: SANITY_TOKEN,
        apiVersion: '2021-03-25' // use a UTC date string
      }
    })
​
    // Update the Nacelle JS SDK Data module to use preview connector
    app.$nacelle.data.update({
      connector: sanityConnector
    })
  }
}