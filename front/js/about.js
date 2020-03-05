var app;

window.onload = function () {
  app = new Vue({
    el: '#app',
    data: {
      user: {},
      here: false
    }
  });
    console.log(app.user);
  $.ajax({
   url: "/getUserInfo",
   type: "GET",
   success: function (data) {
     console.log(data);
     app.user = data;
     app.here = true;
   },
   error: function (err) {
     app.here = false;
   }
 });
}
