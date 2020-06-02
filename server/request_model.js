const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getRequests = async () => {
  const client = await pool.connect();
  return new Promise(function(resolve, reject) {
    client.query('SELECT * FROM help_request ORDER BY created_at ASC')
    .then(res => resolve(res.rows))
    .catch(e => reject(e))
    client.release();
  }) 
}

const getNextRequest = async () => {
  const client = await pool.connect();
  return new Promise(function(resolve, reject) {
    client.query('SELECT * FROM help_request WHERE status=\'raised\' ORDER BY created_at ASC LIMIT 1', (error, results) => {
      if (error) {
        reject(error);
      }
      try {
        resolve(results.rows);
      } catch(e) {
        reject(e);
      }
    });
    client.release();
  }) 
}

const createRequest = async (body) => {
  const client = await pool.connect();
  return new Promise(function(resolve, reject) {
    const { title, location, status } = body
    client.query('INSERT INTO help_request (title, location, status) VALUES ($1, $2, $3) RETURNING *', [title, location, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new request has been added.`)
    })
    client.release();
  })
}

const updateRequest = async (body) => {
  const client = await pool.connect();
  return new Promise(function(resolve, reject) {
    const { id, status } = body
    pool.query('UPDATE help_request SET status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`The status of the request has been updated.`)
    })
    client.release();
  })
}

module.exports = {
  getRequests,
  getNextRequest,
  createRequest,
  updateRequest,
}