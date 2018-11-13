/*
* Authors: Dustin shrosphire
* Notes:
*/

let comps = require("../componetBuilder");

let testComp = new comps.Builder(`
    <p>testing</p>
  `)

let webServer = new comps.Builder(`
    <p>main-chat-server</p>
    ${testComp.html}
    <button id="logout-button">logout</button>
` , 'main-chat-server');

;
module.exports.webServer = webServer;
