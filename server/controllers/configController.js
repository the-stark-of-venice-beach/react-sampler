const db = require('./../database');

const createConfig = (req, res) => {
  const query = 'INSERT INTO config(user_id, keymap) VALUES($1, $2) RETURNING *';
  const values = [req.body.user_id, req.body.keymap];

  db.query(query, values, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Internal error (saving to database)');
    } else {
      const config = dbRes.rows[0];
      // console.log('saved config: ', config);
      res.status(200).send('ok');
    }
  });
};

const getConfig = (req, res) => {
  const query =
    `SELECT keymap FROM config WHERE user_id=${req.body.user_id};`;

  // console.log('query ', query);

  db.query(query, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send("Internal error (selecting from database)");
    } else {

      const config = dbRes.rows[0];
      // console.log("saved config: ", config);
      res.status(200);
      res.json(config);
    }
  });
};



module.exports = { createConfig, getConfig };
