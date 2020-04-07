var appClient;
var appHotel;
var app;

window.onload = function () {
  $.ajax({
      url: "/getUserInfo",
      type: "GET",
      success: function (data) {
          console.log(data);
          app = new Vue({
              el: '#app',
              data: {
                  user: data,
                  here: true
              }
          });

     },
     error: function (err) {

     }
   });

    $.ajax({
        url: "/getAllHotels",
        type: "GET",
        success: function (hotelsInJson) {
            let hotelObj = [];
            hotelsInJson.forEach(element => hotelObj.push((element)));
            hotelObj.forEach(hotelEl => $("#allHotels").append(new Option(hotelEl.name, hotelEl.name, true, false)));
        },
        error: function (err) {
            console.log("error");
        }
    });
}

function validateForm() {
    let formData = new FormData(document.getElementById('formManagerRegister'));
    if (document.forms["formManagerRegister"]["inputEmail1"].value == "") {
        alert("Email must be filled out");
        return false;
    }
  /*  if (document.forms["formManagerRegister"]["allHotels"].value == "") {
        alert("Hotel must be selected");
        return false;
    } else {
        getHotelId().then(response => {
                console.log('document.forms["formManagerRegister"]["hotelId"].value 2');
                console.log(document.forms["formManagerRegister"]["hotelId"].value);
            }
        );
    }*/

    if ($('.formManagerRegister').hasClass('userNotExists')) {
        if (document.forms["formManagerRegister"]["inputPassword1"].value == "") {
            alert("Password must be filled out");
            return false;
        }
        if (document.forms["formManagerRegister"]["inputPassword2"].value != document.forms["myFormRegister"]["inputPassword1"].value) {
            alert("Password must be equal");
            return false;
        }
        if (document.forms["formManagerRegister"]["inputFirstName"].value == "") {
            alert("First Name must be filled out");
            return false;
        }
        if (document.forms["formManagerRegister"]["inputLastName"].value == "") {
            alert("Last Name must be filled out");
            return false;
        }
        if (document.forms["formManagerRegister"]["inputPhone"].value == "") {
            alert("Phone must be filled out");
            return false;
        }
    } else {
        getClientId().then(response => {
                console.log('document.forms["formManagerRegister"]["idOfClient"].value 2');
                console.log(document.forms["formManagerRegister"]["idOfClient"].value);
            }
        );
    }
}

function changeUserExistence() {
    if (document.forms["formManagerRegister"]["isUserExists"].value == "No") {
        $(".hidden").map(function () {
            $(this).removeClass('hidden').addClass('visible');
            $('.formManagerRegister').removeClass('userExists').addClass('userNotExists');
        })
    } else {
        $(".visible").map(function () {
            $(this).removeClass('visible').addClass('hidden');
            $('.formManagerRegister').removeClass('userNotExists').addClass('userExists');
        })
    }
}

function getClientId() {
    return $.ajax({
        url: "/getUserIsByEmail",
        type: "GET",
        data: {email: document.forms["formManagerRegister"]["inputEmail1"].value},
        success: function (client) {
            let idOfClient = client[0].id;
            console.log("idOfClient");
            console.log(idOfClient);
            appClient = new Vue({
                el: '#client-info',
                data: {
                    clientId: idOfClient
                }
            });
        },
        error: function (err) {
            console.log("error in Getting id of client");
            app.here = false;
        }
    });
}

function getHotelId() {
    return $.ajax({
        url: "/getHotelIdByName",
        type: "GET",
        data: {name: document.forms["formManagerRegister"]["allHotels"].value},
        success: function (hotel) {
            let idOfHotel = hotel[0].id;
            console.log("idOfHotel");
            console.log(idOfHotel);
            appClient = new Vue({
                el: '#hotel-info',
                data: {
                    hotelId: idOfHotel
                }
            });
        },
        error: function (err) {
            console.log("error in getHotelIdByName");
        }
    });
}
