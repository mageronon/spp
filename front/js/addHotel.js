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
    if (document.forms["myFormAddHotel"]["selectedmanager"].value == "") {
        alert("manager must be filled out");
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
                    manager: data.manager,
                    hotel: data.hotel
                }
            });
        }
    });
}
