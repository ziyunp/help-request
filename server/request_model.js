const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// dbname=df3hga2ai8fk5k host=ec2-46-137-84-140.eu-west-1.compute.amazonaws.com port=5432 user=eyntyilolqfnej password=91a07e2dae5dfe7d43051dd1b5def38a67d95662e44ce2dff81865c03ac58977 sslmode=require
// postgres://eyntyilolqfnej:91a07e2dae5dfe7d43051dd1b5def38a67d95662e44ce2dff81865c03ac58977@ec2-46-137-84-140.eu-west-1.compute.amazonaws.com:5432/df3hga2ai8fk5k

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

const getRequest = () => {
  return new Promise(function(resolve, reject) {
    const client = await pool.connect();
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