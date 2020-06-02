const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const request_model = require('./request_model')

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.get('/db', async (req, res) => {
  request_model.getRequest()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/requests', (req, res) => {
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


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
