let comps = require("./componetBuilder");




let myCompoent2 = new comps.Builder(`
  <div id="login-page">
    <!--now generate these in javascript kind of like a component render in react -->
    <p>login-page</p>
    <button id="login-button">login</button>
  </div>

  `, "login")

  let testComp = new comps.Builder(`
      <p>testing</p>
    `)

    
  let loginComp = new comps.Builder(`
      <p>main-chat-server</p>
      <button id="logout-button">logout</button>
      ${testComp.build()}
  ` , 'main-chat-server');




  myCompoent2.build(true);
  //maybe have a second arg to make it hidden to start
  loginComp.build(true,true)


  myCompoent2.addHandler(true, "login-button", "click",function(){myCompoent2.hide(); loginComp.show() });

  loginComp.addHandler(true, "logout-button","click", function(){myCompoent2.show(); loginComp.hide();})
