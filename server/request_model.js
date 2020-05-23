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

const createRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, location, status } = body
    pool.query('INSERT INTO requests (title, location, status) VALUES ($1, $2, $3) RETURNING *', [title, location, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new request has been added. Title: ${results.rows[0].title}, Location: ${results.rows[0].location}`)
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
  createRequest,
  deleteRequest,
}