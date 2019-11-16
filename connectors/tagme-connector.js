const util = require('util')
const request = require('request')

const request_ = util.promisify(request)

module.exports = class TagmeConnector{
    constructor(params){
        this.token = params.token
    }
    do_request({url, text}){
        // return Promise.reject()
        const req_options = {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            form: {
                'gcube-token': this.token,
		            text
            }
        }
        return new Promise((resolve, reject) => {
            request({
                url: `${url}/tag`,
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
                resources: res.annotations
                    .filter(r => r.rho > 0.25)
                    .map(
                        r => ({
                            uri: `http://dbpedia.org/resource/${encodeURIComponent(r['title'].replace(/ /g, '_'))}`,
                            offset: r['start'],
                            size: r['end'] - r['start']
                        })
                )
            }))
            .catch(e => {
                // console.error(e)
                return {error: e}
            })
    }
}
