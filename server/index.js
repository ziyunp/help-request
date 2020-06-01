// const express = require('express')
// const app = express()
// const port = 3001
const path = require('path');
const express = require('express');
const app = express();
// const publicPath = path.join(__dirname, '..', 'public');
let root = path.join(__dirname, '..', 'build/')
app.use(express.static(root))
app.use(function(req, res, next) {
  if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
    res.sendFile('index.html', { root })
  } else next()
})
// app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const request_model = require('./request_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  request_model.getRequests()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/nextRequest', (req, res) => {
  request_model.getNextRequest()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/requests', (req, res) => {
  request_model.createRequest(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/requests', (req, res) => {
  request_model.updateRequest(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

