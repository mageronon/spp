var appHotelItem;
var app;
var idHotel = - 1;

window.onload = function () {
  idHotel = parseInt(document.location.search.split('=')[1]);
  $.ajax({
       url: "/Hotel/" + idHotel,
       type: "GET",
       success: function (data) {
         console.log(data);
         appHotelItem = new Vue({
           el: '#Hotelitem',
           data: {
             hotel: data.hotel,
             user: {},
             rooms: data.rooms
           }
         });
         app = new Vue({
           el: '#app',
           data: {
             user: {},
             here: false
           }
         });
         $.ajax({
            url: "/getUserInfo",
            type: "GET",
            success: function (data1) {
              appHotelItem.user = data1;
              app.user = data1;
              app.here = true;
            },
            error: function (error) {
              app.here = false;
            }
          });
       }
     });


}
