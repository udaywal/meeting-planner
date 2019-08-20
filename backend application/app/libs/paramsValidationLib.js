/* Validating the user fields */

let Email = (email) => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email.match(emailRegex)) {
      return email
    } else {
      return false
    }
  }
  
    /* Minimum eight characters, at least one letter and one number: */
  let Password = (password) => {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (password.match(passwordRegex)) {
      return password
    } else {
      return false
    }
  }
  
  module.exports = {
    Email: Email,
    Password: Password
  }
  