
const data = [
    {
        name: 'spotlight-en',
        url: 'http://localhost:8080/annotate'
    },
    {
        name: 'tagme',
        url: 'http://localhost:8080/annotate'
    },
    {
        name: 'fox',
        url: 'http://localhost:8080/annotate'
    },
    {
        name: 'mock',
        url: 'http://localhost:4000/slow_mock'
    }
]

module.exports.get_addresses = () => {
    return data
}
