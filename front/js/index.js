var appHotelList;
var app;

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
            console.log(data);
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
                    appHotelList.user = data1;
                    app.user = data1;
                    console.log(app.user);
                    app.here = true;
                },
                error: function (error) {
                    console.log(error);
                    app.here = false;
                }
            });
        }
    });


}
