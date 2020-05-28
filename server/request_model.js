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
    pool.query('SELECT * FROM requests ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getNextRequest = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM requests WHERE status=\'raised\' ORDER BY id ASC LIMIT 1', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
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
      // TODO: for all the results.rows, check if there's results before doing that!
      resolve(`A new request has been added. Title: ${results.rows[0].title}, Location: ${results.rows[0].location}`)
    })
  })
}

const updateRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, status } = body
    pool.query('UPDATE requests SET status = $2 WHERE id = $1 RETURNING *', [id, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`The status of the request has been updated. Title: ${results.rows[0].title}, Location: ${results.rows[0].location}, Status: ${results.rows[0].status}`)
    })
  })
}

const deleteRequest = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM requests WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Request deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getRequests,
  getNextRequest,
  createRequest,
  updateRequest,
  deleteRequest
}