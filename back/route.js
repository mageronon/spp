'use strict';

const controller = require('./controller.js');
const admin_controller = require('./admincontroller.js');
const hotel_controller = require('./hotelcontroller.js');

module.exports = function(app) {
  app.route( "/login")
    .post( controller.login);

  app.route( "/register")
    .post( controller.register);

  app.route( "/getUserInfo")
    .get( controller.getUserInfo);

  app.route( "/getHotelInfoForAdmin")
    .get( admin_controller.getHotelInfoForAdmin);

  app.route( "/AddHotel")
    .post( admin_controller.AddHotel);

  app.route( "/getHotelInfo")
    .get( hotel_controller.getHotelInfo);

  app.route( "/Hotel/:hotelId")
  .get( hotel_controller.getHotel);
}
