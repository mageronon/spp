var appHotelList;

window.onload = function () {
  $.ajax({
       url: "/getHotelInfo",
       type: "GET",
       success: function (data) {
         console.log(data);
         appHotelList = new Vue({
           el: '#HotelList',
           data: {
             hotels: data,
             user: {}
           }
         });
         $.ajax({
            url: "/getUserInfo",
            type: "GET",
            success: function (data1) {
              console.log(data1);
                console.log("HERE");
              appHotelList.user = data1;
            },
            error: function (error) {
              console.log(error);
                console.log("HERE22");
            }
          });
       }
     });


}
