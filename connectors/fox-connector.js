const util = require('util')
const request = require('request')

const request_ = util.promisify(request)

const {PREFIXES} = require('../nif-parser')

module.exports = class FoxConnector{
    constructor(){
    }
    do_request({url, text}){
        // return Promise.reject()
        const req_options = {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            json: {
	              input: text,
	              type: "text",
	              task: "ner",
	              output: "jsonld",
                lang: "en",
	              // "foxlight":"org.aksw.fox.tools.ner.en.IllinoisExtendedEN"
            }
        }
        return new Promise((resolve, reject) => {
            request({
                url: `${url}/fox`,
                ...req_options
            }, (err, res) => {
                if(err)
                    return reject(err)
                return resolve(res)
            })
        })
            .then(res => res.body)
            .then(res => ({
                resources: (res['@graph'] || [])
                    .filter(node => node['@type'] === 'nif:Phrase')
                    .map(r => ({
                        uri: r['taIdentRef']
                            .replace( /(.*):/g,
                                      (v, m1) => PREFIXES[m1]
                        ),
                        offset: parseInt(r['beginIndex']),
                        size: parseInt(r['endIndex']) - parseInt(r['beginIndex'])
                    })
                )
            }))
            .catch(e => {
                // console.error(e)
                return {error: e}
            })
    }
}
