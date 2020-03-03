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
    alert("Password must be reaached");
    return false;
  }
  if (document.forms["myFormRegister"]["inputFirstName"].value == "") {
    alert("FirstName must be filled out");
    return false;
  }
  if (document.forms["myFormRegister"]["inputLastName"].value == "") {
    alert("LastName must be filled out");
    return false;
  }
  if (document.forms["myFormRegister"]["inputPhone"].value == "") {
    alert("Phone must be filled out");
    return false;
  }
}
