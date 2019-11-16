const SpotlightConnector = require('./connectors/spotlight-connector.js')
const TagmeConnector = require('./connectors/tagme-connector.js')
const FoxConnector = require('./connectors/fox-connector.js')
const MockConnector = require('./connectors/mock-connector.js')

const config = () => {
      return {
          listen_port: 4040,
          timeout: 10000,
          services: [
              {
                  name: 'spotlight-en',
                  // url: 'https://api.dbpedia-spotlight.org/en',
                  url: 'http://192.168.1.114:8080',
                  weight: 1,
                  connector: new SpotlightConnector()
              },
              {
                  name: 'fox',
                  url: '',
                  weight: 1,
                  connector: new FoxConnector()
              },
              {
                  name: 'tagme',
                  url: 'https://tagme.d4science.org/tagme',
                  weight: 1,
                  connector: new TagmeConnector({
                      token: ''
                  })
              }
          ]
      }
}

module.exports = {
    get: config
}
