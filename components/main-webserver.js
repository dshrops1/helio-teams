/*
* Authors: Dustin shrosphire
* Notes:
*/

let comps = require("../componetBuilder");
let chat = require("./chatComponent").chatComponent

let testComp = new comps.Builder(`
    <p>testing</p>
  `)

let webServer = new comps.Builder(`
    <p>main-chat-server</p>
    ${chat.html}
    <button id="logout-button">logout</button>
` , 'main-chat-server');

;
module.exports.webServer = webServer;
