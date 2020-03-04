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
         user: data
       }
     });

   }
 });
}
