'use strict';
const databaseConfig = require('./databaseConfig');
const {Client} = require('pg');

exports.getHotelInfoForAdmin = function (req, res) {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
    });
    client.connect();
    client.query("SELECT * FROM  public.\"Clients\" WHERE manager='" + true + "';", (err, results) => {
        if (err) {
            client.end();
            console.log(err.stack);
        } else {
            console.log(results.rows);
            client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_manager\" on public.\"Hotel\".id = public.\"Hotel_manager\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_manager\".id_user = public.\"Clients\".id;", (err1, results1) => {
                if (err1) {
                    client.end();
                    console.log(err1.stack);
                } else {
                    client.end();
                    res.status(200).json({
                        manager: results.rows,
                        hotel: results1.rows
                    });
                }
            });
        }
    });
}

exports.AddHotel = async function (req, res) {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
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
        const text1 = 'INSERT INTO public.\"Hotel_manager\"(id_hotel, id_user) VALUES($1, $2) RETURNING *';
        const values1 = [results.rows[results.rows.length - 1].id, req.body.selectedmanager];
        const results1 = await client.query(text1, values1);
        await client.end();
        res.redirect("AddHotel");
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
        console.log(err.stack);
        await client.end();
    }

}
