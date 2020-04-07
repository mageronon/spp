var appHotel;
var app;

function validateForm() {
    if (document.forms["myFormAddHotel"]["inputHotelName"].value == "") {
        alert("HotelName must be filled out");
        return false;
    }
    if (document.forms["myFormAddHotel"]["inputAddress"].value == "") {
        alert("Address must be filled out");
        return false;
    }
    if (document.forms["myFormAddHotel"]["selectedmanager"].value == "") {
        alert("manager must be filled out");
        return false;
    }
}

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
        url: "/getHotelInfoForAdmin",
        type: "GET",
        success: function (data) {
            console.log(data);
            appHotel = new Vue({
                el: '#appHotel',
                data: {
                    manager: data.manager,
                    hotel: data.hotel
                }
            });
        }
    });
}
