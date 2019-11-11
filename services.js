const SpotlightConnector = require('./connectors/spotlight-connector.js')
const TagmeConnector = require('./connectors/tagme-connector.js')
const MockConnector = require('./connectors/mock-connector.js')

const data = [
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
        connector: new TagmeConnector()
    },
    {
        name: 'fox',
        url: 'http://localhost:4000/slow_mock',
        weight: 1,
        connector: new SpotlightConnector()
    },
    // {
    //     name: 'mock',
    //     url: 'http://localhost:4000/slow_mock',
    //     weight: 1,
    //     connector: new MockConnector()
    // }
]

module.exports.get_addresses = () => {
    return data
}
