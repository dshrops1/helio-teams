let comps = require("../componetBuilder");




let myCompoent2 = new comps.Builder(`

    <!--image in relation to the html page not the component builder -->
    <img  src="./assets/helio-logo.png"/>
    <form>
      <input type="email" />
      <input type="password" />
      <input id="login-button" type="submit" />
    </form


  `, "login")

  module.exports.login = myCompoent2;
