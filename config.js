const SpotlightConnector = require('./connectors/spotlight-connector.js')
const TagmeConnector = require('./connectors/tagme-connector.js')
const FoxConnector = require('./connectors/fox-connector.js')
const MockConnector = require('./connectors/mock-connector.js')

const config = () => {
      return {
          // filter_policy: 'REMOVE_SINGLE_SPOTS', // NONE | REMOVE_SINGLE_SPOTS

          timeout: 10000,
          services: [
              {
                  name: 'spotlight-en',
                  // url: 'http://localhost:8080',
                  url: 'https://api.dbpedia-spotlight.org/en',
                  weight: 1,
                  connector: new SpotlightConnector()
              },
              {
                  name: 'tagme',
                  url: 'https://tagme.d4science.org/tagme',
                  weight: 1,
                  connector: new TagmeConnector({
                      token: ''
                  })
              },
              {
                  name: 'fox',
                  url: '',
                  weight: 1,
                  connector: new FoxConnector()
              },
          ]
      }
}

module.exports = {
    get: config
}
