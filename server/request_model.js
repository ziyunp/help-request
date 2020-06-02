const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const getRequest = async () => {
  const client = await pool.connect();
  return new Promise(function(resolve, reject) {
    client.query('SELECT * FROM help_request')
    .then(res => resolve(res.rows))
    .catch(e => alert(e))
    client.release();
  }
  //   const client = await pool.connect();
  //   const result = await client.query('SELECT * FROM help_request');
  //   const results = { 'results': (result) ? result.rows : null};
  //   res.render('pages/db', results );
  //   client.release();
  // } catch (err) {
  //   console.error(err);
  //   res.send("Error " + err);
  // }
  )}
const getRequests = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM help_request ORDER BY created_at ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      try {
        resolve(results.rows);
      } catch(e) {
        reject(e);
      }
    })
  }) 
}

const getNextRequest = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM help_request WHERE status=\'raised\' ORDER BY created_at ASC LIMIT 1', (error, results) => {
      if (error) {
        reject(error);
      }
      try {
        resolve(results.rows);
      } catch(e) {
        reject(e);
      }
    });
  }) 
}

const createRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, location, status } = body
    pool.query('INSERT INTO help_request (title, location, status) VALUES ($1, $2, $3) RETURNING *', [title, location, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new request has been added.`)
    })
  })
}

const updateRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, status } = body
    pool.query('UPDATE help_request SET status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`The status of the request has been updated.`)
    })
  })
}

module.exports = {
  getRequest,
  getRequests,
  getNextRequest,
  createRequest,
  updateRequest,
}