'use strict';
const databaseConfig = require('./databaseConfig');
const {Client} = require('pg')

exports.getHotelInfo = function (req, res) {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
    });
    client.connect();

    client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_manager\" on public.\"Hotel\".id = public.\"Hotel_manager\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_manager\".id_user = public.\"Clients\".id;", (err1, results1) => {
        if (err1) {
            client.end();
            console.log(err1.stack);
        } else {
            client.end();
            console.log(results1.rows);
            res.status(200).json(results1.rows);
        }
    });
}

exports.getHotel = function (req, res) {
    if (isNormalInteger(req.params.hotelId)) {
        const client = new Client({
            user: databaseConfig.user,
            host: databaseConfig.host,
            database: databaseConfig.database,
            password: databaseConfig.password,
            port: databaseConfig.port
        });
        client.connect();

        client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_manager\" on public.\"Hotel\".id = public.\"Hotel_manager\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_manager\".id_user = public.\"Clients\".id where public.\"Hotel\".id =" + req.params.hotelId + ";", (err1, results1) => {
            if (err1) {
                client.end();
                console.log(err1.stack);
            } else {
                console.log(results1.rows);
                if (results1.rows.length != 0) {
                    client.query("SELECT * FROM  public.\"Room\" WHERE id_hotel=" + results1.rows[0].id_hotel + ";", (err, results) => {
                        if (err) {
                            client.end();
                            console.log(err.stack);
                        } else {
                            client.end();

                            console.log(results1.rows[0]);
                            res.status(200).json({
                                hotel: results1.rows[0],
                                rooms: results.rows
                            });
                        }
                    });
                } else {
                    res.status(500).send('Hotel Not Found');
                }
            }
        });
    } else {
        console.log("Error");
        res.status(500).send('Hotel Not Found');
    }
}

exports.getHotelInfoByManager = function (req, res) {
    if (isNormalInteger(req.params.userId)) {
        const client = new Client({
            user: databaseConfig.user,
            host: databaseConfig.host,
            database: databaseConfig.database,
            password: databaseConfig.password,
            port: databaseConfig.port
        });
        client.connect();

        client.query("SELECT * FROM (public.\"Hotel\" INNER JOIN public.\"Hotel_manager\" on public.\"Hotel\".id = public.\"Hotel_manager\".id_hotel) INNER JOIN public.\"Clients\" on public.\"Hotel_manager\".id_user = public.\"Clients\".id where public.\"Clients\".id =" + req.params.userId + ";", (err1, results1) => {
            if (err1) {
                client.end();
                console.log(err1.stack);
            } else {
                console.log(results1.rows);
                if (results1.rows.length != 0) {

                    client.query("SELECT * FROM  public.\"Room\" WHERE id_hotel=" + results1.rows[0].id_hotel + ";", (err, results) => {
                        if (err) {
                            client.end();
                            console.log(err.stack);
                        } else {
                            client.end();
                            res.status(200).json({
                                hotel: results1.rows[0],
                                rooms: results.rows
                            });
                        }
                    });
                } else {
                    res.status(500).send('Hotel Not Found');
                }
            }
        });
    } else {
        console.log("Error");
        res.status(500).send('Hotel Not Found');
    }
}

exports.addroomToHotel = async function (req, res) {
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
        const text = 'INSERT INTO public.\"Room\"(floor, number, price_by_one_beds, beds, id_hotel) VALUES($1, $2, $3, $4, $5) RETURNING *'
        const values = [req.body.inputFloor, req.body.inputNumberRoom, req.body.inputPriceOfBeds, req.body.inputNumberOfBeds, req.body.inputhotelid]
        const results = await client.query(text, values)
        await client.end();
        res.redirect("Hotel?hotelId=" + req.body.inputhotelid);
    } catch (err) {
        console.log(err.stack);
        await client.end();
    }

}

exports.getAllHotels = function (req, res) {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
    });
    client.connect();

    client.query("SELECT * FROM public.\"Hotel\"", (error, result) => {
        if (error) {
            client.end();
            console.log("error!!");
        } else {
            client.end();
            res.status(200).json(result.rows);
        }
    });
}

exports.getHotelIdByName = function (req, res) {
    const client = new Client({
        user: databaseConfig.user,
        host: databaseConfig.host,
        database: databaseConfig.database,
        password: databaseConfig.password,
        port: databaseConfig.port
    });
    client.connect();

    client.query("SELECT id FROM public.\"Hotel\" WHERE name='" + req.query.name + "';", (error, result) => {
        if (error) {
            client.end();
            console.log("error in getHotelIdByName");
        } else {
            client.end();
            res.status(200).json(result.rows);
    }
    });
}

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}
