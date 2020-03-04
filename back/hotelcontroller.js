'use strict';
const { Client } = require('pg')

exports.getHotelInfo = function(req, res){

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432
  });
  client.connect();

  client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_maneger\" on public.\"Hotel\".id = public.\"Hotel_maneger\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_maneger\".id_user = public.\"Clients\".id;", (err1, results1) => {
    if (err1) {
      client.end();
      console.log(err1.stack);
    } else {
      client.end();
      res.status(200).json(results1.rows);
    }
  });
}
exports.getHotel = function (req, res) {
  if(isNormalInteger(req.params.hotelId)){
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'password',
      port: 5432
    });
    client.connect();

    client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_maneger\" on public.\"Hotel\".id = public.\"Hotel_maneger\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_maneger\".id_user = public.\"Clients\".id where public.\"Hotel\".id =" + req.params.hotelId + ";", (err1, results1) => {
      if (err1) {
        client.end();
        console.log(err1.stack);
      } else {
        client.end();
        console.log(results1.rows);
        if(results1.rows.length != 0){
          res.status(200).json({
            hotel: results1.rows[0],
            rooms: []
          });
        }else {
          res.status(500).send('Hotel Not Found');
        }
      }
    });
  }else {
    console.log("Error");
    res.status(500).send('Hotel Not Found');
  }
}
function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}
