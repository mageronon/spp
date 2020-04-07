function validateForm() {
    if (document.forms["myFormRegister"]["inputEmail1"].value == "") {
        alert("Email must be filled out");
        return false;
    }
    if (document.forms["myFormRegister"]["inputPassword1"].value == "") {
        alert("Password must be filled out");
        return false;
    }
    if (document.forms["myFormRegister"]["inputPassword2"].value != document.forms["myFormRegister"]["inputPassword1"].value) {
        alert("Password must be equal");
        return false;
    }
    if (document.forms["myFormRegister"]["inputFirstName"].value == "") {
        alert("Firs tName must be filled out");
        return false;
    }
    if (document.forms["myFormRegister"]["inputLastName"].value == "") {
        alert("Last Name must be filled out");
        return false;
    }
    if (document.forms["myFormRegister"]["inputPhone"].value == "") {
        alert("Phone must be filled out");
        return false;
    }
}
