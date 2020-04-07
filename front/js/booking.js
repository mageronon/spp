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
                    user: data
                }
            });
        }
    });
}
