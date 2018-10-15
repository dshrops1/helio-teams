let comps = require("./componetBuilder");
let login = require("./components/login.js").login
let webServer = require("./components/main-webserver.js").webServer


/*
* Build out your compoents with componetBuilder
* bring them into an index.js to modify them and update so all other logic is done here
*/



  
  login.build(true);
  webServer.build(true,true)


  //this could be tedious not being able to add eventListeners until after its added to document
  login.addHandler(true, "login-button", "click",function(){login.hide(); webServer.show() });
  webServer.addHandler(true, "logout-button","click", function(){login.show(); webServer.hide();})
