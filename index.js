let comps = require("./componetBuilder");
let login = require("./components/login.js").login
let webServer = require("./components/main-webserver.js").webServer
require('dotenv').config()

/*
* Build out your compoents with componetBuilder
* bring them into an index.js to modify them and update so all other logic is done here
*
* The idea is to build a compoent in its own js page and the manipulation and logic the flow through the system
* as it releates to the life of that component is done here so that you arnt worried about the componet after it is built
* and instead are worried about how they change.
*/

//COMPONENTS
login.build(true);
webServer.build(true,true)

//HANDLERS
login.addHandler(true, "login-button", "click",  function(e){
        let loginValues = document.getElementById("login-form")
        let user = loginValues.elements[0].value
        let pass = loginValues.elements[1].value

         fetch("http://localhost:3000/authorizeUser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Basic ${process.env.USERF}:${process.env.PASSWORD}`
          },
          body: JSON.stringify({
            Email: user,
            Password: pass
          })
        }).then(function(res){

          return res.json()

        }).then(function(json){

            if(json){
              login.hide()
              webServer.show()
            }else{
              //for the icon maybe look at browserwindows options for icon and see how
              //that affects pop ups as well as other windows
              alert("YOU SHALL NOT PASS!...without the right credentials.")
            }
            //maybe if it doesnt match we will provide alert saying no match was found?


        })

     e.preventDefault();
  });
//this could be tedious not being able to add eventListeners until after its added to document
//do a fetch request to our api to check if authorized


//CHANGES
