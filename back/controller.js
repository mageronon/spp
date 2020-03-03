'use strict';
const { Client } = require('pg')


exports.getUserInfo = function(req, res){
  res.status(200).json(req.session.user);
}

exports.login = function(req, res){
  //res.status(200).json(req.session.user);
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
  });
  client.connect();
  client.query("SELECT * FROM  public.\"Clients\" WHERE email='" + req.body.inputEmail1 + "' AND password='" + req.body.inputPassword1 + "';", (err, results) => {
    console.log("SELECT * FROM  public.\"Clients\" WHERE email='" + req.body.inputEmail1 + "' AND password='" + req.body.inputPassword1 + "';");
    if (err) {
      client.end();
      console.log(err.stack);
    } else {
      console.log(results.rows)
      if(results.rows.length == 0){
        client.end();
        res.redirect('Login');
      }else {
        client.end();
        req.session.user = results.rows[0];
        res.redirect('Account');
      }
    }
  });

}

exports.register = async function(req, res){

  console.log(req.body);
  //res.status(200).json(req.session.user);
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
  });
  await client.connect()
  client.on('error', e => {
      console.log(e);
      client.end();
  });

  try {
    const text = 'INSERT INTO public.\"Clients\"(first_name, last_name, phone_number, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const values = [req.body.inputFirstName, req.body.inputLastName, req.body.inputPhone, req.body.inputPassword1, req.body.inputEmail1]
    const results = await client.query(text, values)
    req.session.user = results.rows[0];
    //const results = await client.query('SELECT * FROM  public.\"Room\";');
    console.log("Client" + results.rows[0]);
    await client.end();
    res.redirect('Login');
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack);
    await client.end();
  }
}
