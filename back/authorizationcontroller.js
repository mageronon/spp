'use strict';
const databaseConfig = require('./databaseConfig');
const hotelController = require('./hotelcontroller.js');
const clientController = require('./clientcontroller.js');
const {Client} = require('pg')

exports.login = function (req, res) {
    //res.status(200).json(req.session.user);
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
    });
    client.connect();
    client.query("SELECT * FROM  public.\"Clients\" WHERE email='" + req.body.inputEmail1 + "' AND password='" + req.body.inputPassword1 + "';", (err, results) => {
        console.log("SELECT * FROM  public.\"Clients\" WHERE email='" + req.body.inputEmail1 + "' AND password='" + req.body.inputPassword1 + "';");
        if (err) {
            client.end();
            console.log(err.stack);
        } else {
            console.log(results.rows)
            if (results.rows.length == 0) {
                client.end();
                res.redirect('Login');
            } else {
                client.end();
                req.session.user = results.rows[0];
                res.redirect('Account');
            }
        }
    });

}

exports.register = async function (req, res) {
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
        const text = 'INSERT INTO public.\"Clients\"(first_name, last_name, phone_number, password, email) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const values = [req.body.inputFirstName, req.body.inputLastName, req.body.inputPhone, req.body.inputPassword1, req.body.inputEmail1]
        const results = await client.query(text, values);
        req.session.user = results.rows[0];
        console.log("Client" + results.rows[0]);
        await client.end();
        res.redirect('Login');
    } catch (err) {
        console.log(err.stack);
        await client.end();
    }
}

exports.createManager = async function (req, res) {
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
        if (req.body.isUserExists == "Yes") {
            const query1 = 'UPDATE public.\"Clients\" SET manager=$1 WHERE email=$2;'
            const values1 = [true, req.body.inputEmail1];
            const result1 = await client.query(query1, values1);
        } else {
            const query1 = 'INSERT INTO public.\"Clients\"(first_name, last_name, phone_number, password, email, manager) VALUES($1, $2, $3, $4, $5, $6)'
            const values1 = [req.body.inputFirstName, req.body.inputLastName, req.body.inputPhone, req.body.inputPassword1, req.body.inputEmail1, true]
            const result1 = await client.query(query1, values1);
        }

        const query2 = 'INSERT INTO public.\"Hotel_manager\"(id_hotel, id_user) VALUES($1, $2)'
        const values2 = [req.body.hotelId, req.body.clientId];
        const result2 = await client.query(query2, values2);
        // req.session.user = result1.rows[0];

        await client.end();
        res.redirect('Login');
    } catch (err) {
        console.log(err.stack);
        await client.end();
    }
}
