'use strict';

const authorization_controller = require('./authorizationcontroller.js');
const admin_controller = require('./admincontroller.js');
const hotel_controller = require('./hotelcontroller.js');
const client_controller = require('./clientcontroller.js');

module.exports = function (app) {
    app.route("/login")
        .post(authorization_controller.login);

    app.route("/register")
        .post(authorization_controller.register);

    app.route("/createManager")
        .post(authorization_controller.createManager);

    app.route("/getUserIsByEmail")
        .get(client_controller.getUserIdByEmail);

    app.route("/getUserInfo")
        .get(client_controller.getUserInfo);

    app.route("/getHotelInfoForAdmin")
        .get(admin_controller.getHotelInfoForAdmin);

    app.route("/AddHotel")
        .post(admin_controller.AddHotel);

    app.route("/getAllHotels")
        .get(hotel_controller.getAllHotels);

    app.route("/getHotelInfo")
        .get(hotel_controller.getHotelInfo);

    app.route("/Hotel/:hotelId")
        .get(hotel_controller.getHotel);

    app.route("/getHotelInfoByManager/:userId")
        .get(hotel_controller.getHotelInfoByManager);

    app.route("/getHotelIdByName")
        .get(hotel_controller.getHotelIdByName);

    app.route("/addroomToHotel")
        .post(hotel_controller.addroomToHotel);
}
