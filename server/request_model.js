// const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'zp619',
//   host: 'db.doc.ic.ac.uk',
//   database: 'zp619',
//   password: 'iclt',
//   port: 5432,
//   ssl: true
// });

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });


const getRequests = () => {
  return new Promise(function(resolve, reject) {
    client.query('SELECT * FROM help_request ORDER BY created_at ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      try {
        resolve(results.rows);
      } catch(e) {
        reject(e);
      }
      client.end();
    })
  }) 
}

const getNextRequest = () => {
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
      client.end();
    });
  }) 
}

const createRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { title, location, status } = body
    client.query('INSERT INTO help_request (title, location, status) VALUES ($1, $2, $3) RETURNING *', [title, location, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new request has been added.`)
      client.end();
    })
  })
}

const updateRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, status } = body
    client.query('UPDATE help_request SET status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *', [id, status], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`The status of the request has been updated.`)
      client.end();
    })
  })
}

module.exports = {
  getRequests,
  getNextRequest,
  createRequest,
  updateRequest,
}