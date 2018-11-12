/*
* Authors: Dustin shrosphire
* Notes: user enters email and we will check with api that it exsists in our
* database, if it does api will send out an email with a link to reset password
*/

let comps = require("../componetBuilder");

let resetPasswordComponent = comps.Builder(
  `
    <form>
      <input type="email" required/>
      <input type="submit"/>
    </form>
    <p> Please enter your email </p>

  `,
  "resetPassword"
)


module.exports.resetPassword = resetPasswordComponent;
