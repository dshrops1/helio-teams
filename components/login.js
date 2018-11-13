/*
* Authors: Dustin shrosphire
* Notes: should our anchor tags link go to default browser web page hosted else where
* or should we have a pop up window that when submited just closes?
* maybe use buttons and rederict to different components for reset and sign up
*/

let comps = require("../componetBuilder");

let loginComponent = new comps.Builder(`

    <!--image in relation to the html page not the component builder -->
    <img  src="./assets/helio-logo.png"/>
    <form id="login-form">
      <input type="email" />
      <input type="password" />
      <input id="login-button" type="submit" />
    </form>
    <section>
      <button id="resetPasswordButton">reset password</button>
      <button id="signUp">sign up</button>
    </section>

  `, "login")

  module.exports.login = loginComponent;
