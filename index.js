const express = require('express')
const bodyParser = require('body-parser')
const rdf = require('rdf')
const rdfenv = require('rdf').environment

const controller = require('./controller.js')
const controller_nif = require('./controller_nif.js')

const nif_parser = require('./nif-parser.js')

const app = express();

// app.use(bodyParser.json());


app.get('/ping', (req, res) => {
    res.send('pong');
})

app.get('/slow_mock', (req, res) => {
    setTimeout(_ => res.send('pong'), 2000)
})

app.post('/annotate', bodyParser.json(), async (req, res) => {
    controller.annotate(req.body.text)
        .then(r => res.send(r))
        .catch(r => res.send(r))
})

app.post('/annotate-nif', bodyParser.text(), async (req, res) => {
    const parse = rdf.TurtleParser.parse(req.body, 'http://example.com/')
    const parsed = nif_parser.nif_to_object(parse.graph.toArray())
    // controller.annotate(req.body.text)
    //     .then(r => res.send(r))
    //     .catch(r => res.send(r))
    res.send(JSON.stringify(parsed))
})

const port = 4000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
