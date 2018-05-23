const db = require('./../database');

const createUser = (req, res) => {

  console.log("=========>=========>CREATING A USER");

// const query = 'INSERT INTO sampler_user(username, password) VALUES($1, $2) RETURNING *';
// const values = [req.body.username, crypt(req.body.password, gen_salt('md5'))];

const query = `INSERT INTO sampler_user(username, password) VALUES('${req.body.username}', crypt('${req.body.password}', gen_salt('md5')));`;

console.log("insert query : ", query);

db.query(query, (dbErr, dbRes) => {
  if (dbErr) {
    // handle error
    console.log('dbErr: ', debErr);
    res.status(500);
    res.send('Internal error (saving to database)');
  } else {
    console.log("dbRes: ", dbRes);
    // const user = dbRes.rows[0];
    // res.json(user);
    
    res.status(200);
    return res.end('ok');
  }

  });
};

const verifyUser = (req, res) => {
  console.log("=========>LOGIN A USER");
  
  // console.log("req: ", req);
  console.log("req.body: ", req.body);
  
  // const query = 'SELECT * FROM sampler_user WHERE username=$1 AND password=$2';
  // const values = [req.body.username, req.body.password];
  const query = `SELECT _id, username, password = crypt('${req.body.password}', password) AS authenticated FROM sampler_user WHERE username='${req.body.username}';`;
  // should return: columns _id, username, authenticated

  // SELECT password = crypt('icecream', password) FROM sampler_user WHERE username = 'kyle';
  
  console.log("verifyUser query: ", query);
  db.query(query, (dbErr, dbRes) => {
    if (dbErr) {
      // handle error
      res.status(500);
      res.send('Could not find username/password');
    } else {
      console.log('response from db: ', dbRes.rows[0]);
      console.log('response from db: value ', dbRes.rows[0]['authenticated']);
      const user = dbRes.rows[0];
      res.json(user);
    }
  });
};

module.exports = { createUser, verifyUser };
