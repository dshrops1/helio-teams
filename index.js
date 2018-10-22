let comps = require("./componetBuilder");
let login = require("./components/login.js").login
let webServer = require("./components/main-webserver.js").webServer


/*
* Build out your compoents with componetBuilder
* bring them into an index.js to modify them and update so all other logic is done here
*
* The idea is to build a compoent in its own js page and the manipulation and logic the flow through the system
* as it releates to the life of that component is done here so that you arnt worried about the componet after it is built
* and instead are worried about how they change.
*/




  login.build(true);



  //this could be tedious not being able to add eventListeners until after its added to document
  //do a fetch request to our api to check if authorized
  login.addHandler(true, "login-button", "click",function(e){
    login.hide();
    e.preventDefault();
    console.log("test") 
  });
