var app;
var app2;

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

            app2 = new Vue({
                el: '#app2',
                data: {
                    user: data,
                    hotel: {}
                }
            });
            if (data.manager) {
                $.ajax({
                    url: "/getHotelInfoByManager/" + data.id,
                    type: "GET",
                    success: function (data1) {
                        console.log(data1);
                        console.log(app2);
                        app2.hotel = data1;
                    },
                    error: function (err1) {

                    }
                });
            }
<<<<<<< HEAD
          });
         }
       },
       error: function (err) {

       }
     });
=======
        },
        error: function (err) {
        }
    });
>>>>>>> refs/remotes/origin/master
}
