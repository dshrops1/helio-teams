let comps = require("./componetBuilder");

let myComponent = new comps.Builder(`<p>test</p>`);


let myCompoent2 = new comps.Builder(`
    <p>pre testing</p>
    ${myComponent.build()}

  `)

  myCompoent2.build(true)
  console.log(myCompoent2)

document.getElementById('login-button').onclick = function(){

    document.getElementById('login-page').setAttribute("hidden",true)
    document.getElementById('main-chat-server').removeAttribute("hidden")
}

document.getElementById('logout-button').onclick = function(){
  document.getElementById("main-chat-server").setAttribute("hidden",true)
  document.getElementById("login-page").removeAttribute("hidden")
}
