const express = require('express')
const bodyParser = require('body-parser')

const controller = require('./controller.js')

const app = express();

app.use(bodyParser.json());


app.get('/ping', (req, res) => {
    res.send('pong');
})

app.get('/slow_mock', (req, res) => {
    setTimeout(_ => res.send('pong'), 2000)
})

app.post('/annotate', async (req, res) => {
    controller.annotate(req.body.text)
        .then(r => res.send(r))
        .catch(r => res.send(r))
})

const port = 4000
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
