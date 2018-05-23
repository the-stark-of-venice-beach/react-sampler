const db = require('./../database');

const createWav = (req, res) => {
  const query = 'INSERT INTO wav(user_id, wav) VALUES($1, $2) RETURNING *';
  const values = [req.body.user_id, req.body.wav];

  db.query(query, values, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Internal error (saving wav to database)');
    } else {
      const user = dbRes.rows[0];
      res.json(user);
    }
  });
};

const getWav = (req, res) => {
  const query = 'SELECT * FROM wav WHERE user_id=$1';
  const values = [req.body.user_id];

  db.query(query, values, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Could not find files for username');
    } else {
      const wavs = dbRes.rows;
      res.json(wavs);
    }
  });
};

module.exports = { createWav, getWav };
