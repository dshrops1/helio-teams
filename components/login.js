/*
* Authors: Dustin shrosphire
* Notes: should our anchor tags link go to default browser web page hosted else where
* or should we have a pop up window that when submited just closes?
*/

let comps = require("../componetBuilder");

let myCompoent2 = new comps.Builder(`

    <!--image in relation to the html page not the component builder -->
    <img  src="./assets/helio-logo.png"/>
    <form id="login-form">
      <input type="email" />
      <input type="password" />
      <input id="login-button" type="submit" />
    </form>
    <a href="#">reset password</a>
    <a href="#">sign up</a>


  `, "login")

  module.exports.login = myCompoent2;
