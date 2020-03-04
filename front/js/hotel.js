var appHotelItem;
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
         $.ajax({
            url: "/getUserInfo",
            type: "GET",
            success: function (data1) {
              appHotelItem.user = data1;
            },
            error: function (error) {
              console.log(error);
            }
          });
       }
     });


}
