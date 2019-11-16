const util = require('util')
const request = require('request')

const request_ = util.promisify(request)

module.exports = class SpotlightConnector{
    constructor(){
    }
    do_request({url, text}){
        // return Promise.reject()
        const req_options = {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            form: {
                text
            }
        }
        return new Promise((resolve, reject) => {
            request({
                url: `${url}/annotate`,
                ...req_options
            }, (err, res) => {
                if(err)
                    return reject(err)
                return resolve(res)
            })
        })
            .then(res => res.body)
            .then(body => JSON.parse(body))
            .then(res => ({
                resources: res.Resources.map(
                    r => ({
                        uri: r['@URI'],
                        offset: parseInt(r['@offset']),
                        size: r['@surfaceForm'].length
                    })
                )
            }))
            .catch(e => {
                // console.error(e)
                return {error: e}
            })
    }
}
