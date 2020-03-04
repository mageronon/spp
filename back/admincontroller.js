'use strict';
const { Client } = require('pg')

exports.getHotelInfoForAdmin = function(req, res){

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
  });
  client.connect();
  client.query("SELECT * FROM  public.\"Clients\" WHERE manager='" + true + "';", (err, results) => {
    if (err) {
      client.end();
      console.log(err.stack);
    } else {
      console.log(results.rows);
      client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_maneger\" on public.\"Hotel\".id = public.\"Hotel_maneger\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_maneger\".id_user = public.\"Clients\".id;", (err1, results1) => {
        if (err1) {
          client.end();
          console.log(err1.stack);
        } else {
          client.end();
          res.status(200).json({
            maneger: results.rows,
            hotel: results1.rows
          });
        }
      });
    }
  });
}

exports.AddHotel = async function(req, res){
  console.log(req.body);
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
    const text = 'INSERT INTO public.\"Hotel\"(name, adress) VALUES($1, $2) RETURNING *';
    const values = [req.body.inputHotelName, req.body.inputAddress];
    const results = await client.query(text, values);
    //const results = await client.query('SELECT * FROM  public.\"Room\";');
    console.log(results.rows[results.rows.length - 1]);
    const text1 = 'INSERT INTO public.\"Hotel_maneger\"(id_hotel, id_user) VALUES($1, $2) RETURNING *';
    const values1 = [results.rows[results.rows.length - 1].id, req.body.selectedManeger];
    const results1 = await client.query(text1, values1);
    await client.end();
    res.redirect("AddHotel");
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  } catch (err) {
    console.log(err.stack);
    await client.end();
  }

}
