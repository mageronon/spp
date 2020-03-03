'use strict';

const controller = require('./controller.js');

module.exports = function(app) {
  app.route( "/login")
    .post( controller.login);


  app.route( "/register")
    .post( controller.register);


  app.route( "/getUserInfo")
    .get( controller.getUserInfo);

}
