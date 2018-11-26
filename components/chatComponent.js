/*
* Authors: Dustin shrosphire
* Notes: we will have a place to display messages as well
* as an input that allows the user to type and send a message
*/

let comps = require("../componetBuilder");

let chatComponent = new comps.Builder(`
    <div id="chat-div">
      
    </div>
    <form id="chat-form">
      <input type="text"></input>
      <input type="submit"></input>
    </form>

  `,"chatComponent")

module.exports.chatComponent = chatComponent
