const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const util = require('util')

const provider = require('./provider.js')

const app = express();
app.use(bodyParser.json());

const request_ = util.promisify(request)

function annotate() {
    const service_list = provider.get_addresses()

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
            return request_(options)
        }
    )

    return Promise.all(requests)
        .then(responses => responses.map(x => JSON.parse(x.body)))
}

    app.get('/ping', (req, res) => {
        res.send('pong');
    })

    app.post('/annotate', (req, res) => {
        annotate()
            .then(resources => res.json({
                Resources: resources
            }))
    });

    const port = 4000
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
