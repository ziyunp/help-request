const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const request_model = require('./request_model')

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.get('/requests', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM help_request ORDER BY created_at ASC');
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.get('/nextRequest', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM help_request WHERE status=\'raised\' ORDER BY created_at ASC LIMIT 1');
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.post('/requests', async (req, res) => {
  try {
    const client = await pool.connect();
    const { title, location, status } = req.body;
    const result = await client.query('INSERT INTO help_request (title, location, status) VALUES ($1, $2, $3) RETURNING *', [title, location, status]);
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.put('/requests', async (req, res) => {
  try {
    const client = await pool.connect();
    const { id, status } = req.body;
    const result = await client.query('UPDATE help_request SET status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id, status]);
    const results = { 'results': (result) ? result.rows : null};
    res.status(200).send(results);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
