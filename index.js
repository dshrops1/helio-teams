let comps = require("./componetBuilder");
let login = require("./components/login.js").login
let webServer = require("./components/main-webserver.js").webServer
let resetPassword = require("./components/resetPassword.js").resetPassword;
const io = require("socket.io-client")

require('dotenv').config()

const {dialog} = require('electron').remote
const dialogOptions = {type: 'info', buttons: ['OK', 'Cancel'], message: 'YOU SHALL NOT PASS!...without the right credentials.?'}
//dialog.showMessageBox(dialogOptions, i => console.log(i))

let socket;
/*
* Build out your compoents with componetBuilder
* bring them into an index.js to modify them and update so all other logic is done here
*
* The idea is to build a compoent in its own js page and the manipulation and logic the flow through the system
* as it releates to the life of that component is done here so that you arnt worried about the componet after it is built
* and instead are worried about how they change.
*/

//COMPONENTS
login.build();
webServer.build();
resetPassword.build();

login.addToDocument()

//HANDLERS
login.addHandler(true, "login-button", "click",  function(e){
        let loginValues = document.getElementById("login-form")
        let user = loginValues.elements[0]
        let pass = loginValues.elements[1]

         fetch(process.env.AUTHROUTE, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Basic ${process.env.USERF}:${process.env.PASSWORD}`
          },
          body: JSON.stringify({
            Email: user.value,
            Password: pass.value
          })
        }).then(function(res){

          return res.json()

        }).then(function(json){

            if(json){
              login.hide()
              webServer.addToDocument()

              socket = io(process.env.SOCKETCONNECTION)
              socket.on("connect", function(){
                console.log("we are connected")

                webServer.addHandler(true, "test-socket","click", function(e){
                  console.log("sending event")
                  socket.emit("test")
                })

                socket.on("disconnect", function(){
                  console.log("disconnecting")
                  socket = null
                })

              })

              //this may present an issue when we try to remove second time
              webServer.addHandler(true, "logout-button", "click", function(e){
                 login.show()
                 webServer.removeFromDocument()

                 user.value = ""
                 pass.value = ""

               })






            }else{
              //for the icon maybe look at browserwindows options for icon and see how
              //that affects pop ups as well as other windows
              //alert("YOU SHALL NOT PASS!...without the right credentials.")
              dialog.showMessageBox(dialogOptions, i => console.log(i))
            }
            //maybe if it doesnt match we will provide alert saying no match was found?


        })

     e.preventDefault();
  });
login.addHandler(true, "resetPasswordButton", "click", function(e){
  login.hide()
  resetPassword.addToDocument()
  resetPassword.addHandler(true, "reset-button", "click", function(e){


  let resetValue = document.getElementById("reset-form")
  let user = resetValue.elements[0]

  fetch(process.env.RESETPASSROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${process.env.USERF}:${process.env.PASSWORD}`
    },
    body: JSON.stringify({
      Email: user.value
    })
     }).then(function(res){

       return res.json()

     }).then(function(json){

        resetPassword.removeFromDocument()
        login.show()
        console.log(json)
        user.value = ""

     })
  })
});
login.addHandler(true, "signUp", "click", function(e){
  alert("workds")
})
//why am I able to add a handler on resetPassword even though its not part of the DOM yet
//but I cant do the same with webserver logout


//CHANGES
