const services = require('./services')

const {merge_spottings, sample_data} = require('./merger.js')

REQ_TIMEOUT = 5000

Promise.timeout = function(promise, timeout){
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => reject('Timed out'), timeout);
        })
    ])
}

function do_requests(text){

    const service_list = services.get_addresses()

    const requests = service_list.map(
        (service) => {
            return {
                name: service.name,
                weight: service.weight,
                request: Promise.timeout(
                    service.connector.do_request({
                        url: service.url,
                        text: text
                    }), REQ_TIMEOUT)
            }
        }
    )
    return requests
}

module.exports.annotate = async function(text) {
    console.log(`--> Annotating "${text}"`)
    const pending_requests = do_requests(text)
    let finished_requests = []

    for (p of pending_requests){
        try {
            const response = await p.request
            if(response.error)
                throw new Error(response.error)
            console.log(`--> ${p.name} recognized ${JSON.stringify(response.resources)}`)
            finished_requests.push({
                ...p,
                resources: response.resources,
            })
        } catch (e){
            console.log(`--> service ${p.name} failed`)
            console.error(e)
        }
    }

    const final_results = merge_spottings(finished_requests)

    console.log(`--> Final Response is "${JSON.stringify(final_results)}"`)

    return Promise.resolve({
        data: final_results
    })
}
