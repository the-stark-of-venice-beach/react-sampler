const db = require('./../database');

const createUser = (req, res) => {
  const query = 'INSERT INTO user(username, password) VALUES($1, $2) RETURNING *';
  const values = [req.body.username, req.body.password];

  db.query(query, values, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Internal error (saving to database)');
    } else {
      const player = dbRes.rows[0];
      res.json(player);
    }
  });
};

module.exports = { createUser };