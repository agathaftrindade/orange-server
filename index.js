const express = require('express')
const bodyParser = require('body-parser')

const controller = require('./controller.js')
// const controller_nif = require('./controller_nif.js')

const nif_parser = require('./nif-parser.js')

const config = require('./config')

const app = express();

// app.use(bodyParser.json());


app.get('/ping', (req, res) => {
    res.send('pong');
})

app.get('/slow_mock', (req, res) => {
    setTimeout(_ => res.send('pong'), 2000)
})

app.post('/annotate', bodyParser.json(), async (req, res) => {
    controller.annotate(req.body.text, {
        filter_policy: req.body.filter_policy
    })
        .then(r => res.send(r))
        .catch(r => {res.status(500); res.send(r)})
})

// app.post('/annotate-nif', bodyParser.text(), async (req, res) => {
//     const parsed = nif_parser.string_to_object(req.body)
//     // controller.annotate(req.body.text)
//     //     .then(r => res.send(r))
//     //     .catch(r => res.send(r))
//     res.json(parsed)
// })

const port = config.get().listen_port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
