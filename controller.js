const config_ = require('./config')

const {merge_spottings, sample_data} = require('./merger.js')


Promise.timeout = function(promise, timeout){
    return Promise.race([
        promise,
        new Promise((resolve, reject) => {
            setTimeout(() => reject('Timed out'), timeout);
        })
    ])
}

function do_requests(text, config){

    const service_list = config.services

    const requests = service_list.map(
        (service) => {
            return {
                name: service.name,
                weight: service.weight,
                request: Promise.timeout(
                    service.connector.do_request({
                        url: service.url,
                        text: text
                    }), config.timeout)
            }
        }
    )
    return requests
}

module.exports.annotate = async function(text, params) {
    try{
        console.log(`--> Annotating "${text}"`)

        const config = config_.get()

        config.filter_policy = config.filter_policy || params.filter_policy
        console.log(config.filter_policy)

        const pending_requests = do_requests(text, config)
        let finished_requests = []


        for (p of pending_requests){
            try {
                const response = await p.request
                if(response.error){
                    throw new Error(response.error)
                }
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

        const final_results = merge_spottings(finished_requests, config)

        console.log(`--> Final Response is "${JSON.stringify(final_results)}"`)

        return Promise.resolve({
            data: final_results
        })
    }catch(e){
        console.error(e)
        return Promise.reject(e)
    }
}
