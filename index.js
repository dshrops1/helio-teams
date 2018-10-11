document.getElementById('login-button').onclick = function(){

    document.getElementById('login-page').setAttribute("hidden",true)
    document.getElementById('main-chat-server').removeAttribute("hidden")
}

document.getElementById('logout-button').onclick = function(){
  document.getElementById("main-chat-server").setAttribute("hidden",true)
  document.getElementById("login-page").removeAttribute("hidden")
}
