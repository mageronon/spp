function validateForm() {
    if (document.forms["myFormLogin"]["inputEmail1"].value == "") {
        alert("Email must be filled out");
        return false;
    }
    if (document.forms["myFormLogin"]["inputPassword1"].value == "") {
        alert("Password must be filled out");
        return false;
    }
}
