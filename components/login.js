let comps = require("../componetBuilder");




let myCompoent2 = new comps.Builder(`

    <!--now generate these in javascript kind of like a component render in react -->
    <p>login-page</p>
    <button id="login-button">login</button>


  `, "login")

  module.exports.login = myCompoent2;
