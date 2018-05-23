const { Client } = require('pg');

// const url = 'postgres://nipjwpye:_UpXKJTMZQhtyiV4l-9AJa1ME8oi3xy2@nutty-custard-apple.db.elephantsql.com:5432/nipjwpye';

// for testing locally
const url = 'postgres://student:ilovetesting@localhost/react-sampler';

const database = new Client({
  connectionString: url,
  ssl: true,
});

module.exports = database;
