const util = require('util')
const request = require('request')

const services = require('./services')
const request_ = util.promisify(request)


REQ_TIMEOUT = 5000

Promise.timeout = function(promise, timeout){
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => reject('Timed out'), timeout);
        })
    ])
}

function do_requests(){

    const service_list = services.get_addresses()

    const requests = service_list.map(
        (service) => {
            const options = {
                method: 'POST',
                url: service.url,
                headers: {
                    Accept: 'application/json'
                },
                form: {
                    text: 'O rato roeu a roupa do rei de Roma'
                }
            }

            return {
                name: service.name,
                request: Promise.timeout(request_(options), REQ_TIMEOUT)
            }
        }
    )

    return requests
}

module.exports.annotate = async function() {
    const pending_requests = do_requests()
    for (p of pending_requests){
        try {
            const result = await p.request
            const annotation = JSON.parse(result.body)
        } catch (e){
            console.log(`${p.name} failed`)
        }
    }
    return Promise.resolve({
        data: []
    })
}
