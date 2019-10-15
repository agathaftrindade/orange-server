const SpotlightConnector = require('./connectors/spotlight-connector.js')
const MockConnector = require('./connectors/mock-connector.js')

const data = [
    {
        name: 'spotlight-en',
        url: 'http://localhost:8080',
        // url: 'https://api.dbpedia-spotlight.org/pt',
        weight: 2,
        connector: new SpotlightConnector()
    },
    {
        name: 'tagme',
        url: 'http://localhost:8081',
        weight: 1,
        connector: new SpotlightConnector()
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
