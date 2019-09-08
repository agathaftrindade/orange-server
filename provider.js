
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
    }
]

module.exports.get_addresses = () => {
    return data
}
