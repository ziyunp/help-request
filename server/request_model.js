const Pool = require('pg').Pool
const pool = new Pool({
  user: 'zp619',
  host: 'db.doc.ic.ac.uk',
  database: 'zp619',
  password: 'iclt',
  port: 5432,
  ssl: true
});


const getRequests = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM requests ORDER BY created_at ASC', (error, results) => {
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
    pool.query('SELECT * FROM requests WHERE status=\'raised\' ORDER BY created_at ASC LIMIT 1', (error, results) => {
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

const createRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, location, status } = body
    pool.query('INSERT INTO requests (title, location, status) VALUES ($1, $2, $3) RETURNING *', [title, location, status], (error, results) => {
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
    pool.query('UPDATE requests SET status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`The status of the request has been updated.`)
    })
  })
}

module.exports = {
  getRequests,
  getNextRequest,
  createRequest,
  updateRequest,
}