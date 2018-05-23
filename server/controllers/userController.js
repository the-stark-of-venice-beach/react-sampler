const db = require('./../database');

const createUser = (req, res) => {
  console.log(req.body);
  const query = 'INSERT INTO sampler_user(username, password) VALUES($1, $2) RETURNING *';
  const values = [req.body.username, crypt(req.body.password, gen_salt('md5'))];

  db.query(query, values, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Internal error (saving to database)');
    } else {
      const user = dbRes.rows[0];
      res.json(user);
    }
  });
};

const verifyUser = (req, res) => {
  const query = 'SELECT * FROM sampler_user WHERE username=$1 AND password=$2';
  const values = [req.body.username, req.body.password];
  // const query = `SELECT password = crypt(req.body.password, password) FROM sampler_user WHERE username=${req.body.username} AND password=${req.body.password};`

  db.query(query, values, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Could not find username/password');
    } else {
      const user = dbRes.rows[0];
      res.json(user);
    }
  });
};

module.exports = { createUser, verifyUser };
