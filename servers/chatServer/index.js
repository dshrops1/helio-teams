/*
* Author: Dustin Shropshire
*
* socketIO server
*/
const Server = require("socket.io")
const io = new Server()


io.on("connection", function(socket){
  console.log("we have a connection: ")

  socket.on("disconnect", function(){
    console.log("disconnecting")
  })

  socket.on("test", function(){
    console.log("testing works")
  })


})

//test event



io.listen(3001, ()=>{})
