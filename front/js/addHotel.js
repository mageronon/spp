var appHotel;

function validateForm() {
  if (document.forms["myFormAddHotel"]["inputHotelName"].value == "") {
    alert("HotelName must be filled out");
    return false;
  }
  if (document.forms["myFormAddHotel"]["inputAddress"].value == "") {
    alert("Address must be filled out");
    return false;
  }
  if (document.forms["myFormAddHotel"]["selectedManeger"].value == "") {
    alert("Maneger must be filled out");
    return false;
  }
}

window.onload = function () {
  $.ajax({
       url: "/getHotelInfoForAdmin",
       type: "GET",
       success: function (data) {
         console.log(data);
         appHotel = new Vue({
           el: '#appHotel',
           data: {
             maneger: data.maneger,
             hotel: data.hotel
           }
         });
       }
     });
}
