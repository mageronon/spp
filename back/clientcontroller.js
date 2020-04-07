'use strict';
const databaseConfig = require('./databaseConfig');
const {Client} = require('pg');

exports.getUserInfo = function (req, res) {
    res.status(200).json(req.session.user);
}

exports.getUserIdByEmail = function (req, res) {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
    });
    client.connect();
    client.query("SELECT id FROM public.\"Clients\" WHERE email ='" + req.query.email + "';", (error, result) => {
        if (error) {
            client.end();
            console.log("error in getUserIdByEmail");
        } else {
            client.end();
            res.status(200).json(result.rows);
        }
    });
}