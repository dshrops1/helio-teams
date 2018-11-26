/*
* Author: Dustin Shropshire
*
* socketIO server
*/
const Server = require("socket.io")
const io = new Server()


io.on("connection", (socket)=>{
  console.log("we have a connection: ")

  socket.on("disconnect", function(){
    console.log("disconnecting")
  })

  socket.on("test", function(){
    console.log("testing works")
  })

  socket.on("message", (msg)=>{
    console.log("message we got:")
    console.log(msg)

    io.emit("broadcast", msg)
  })


})

//test event



io.listen(3001, ()=>{})
