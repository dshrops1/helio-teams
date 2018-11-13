/*
* Author: Dustin Shropshire
*
* ComponetBuilder is a simple module builder used for specifying how an html page should be build
* as well as how it should change in responce to events.
*/
 function Builder(html,id){

    this.html = html,
    this.id = id,
    //because add to document is an argument we need a way to add later if false
    //at some point we may want to be able to specify where to append to
    this.build = function(){
      //if arg is passed as true we create and append to body
        let eleCreated = document.createElement("div");
        eleCreated.setAttribute("id",this.id)
        eleCreated.innerHTML = this.html
        this.html  = eleCreated;

    },
    //using flex box you would need addiotnal css of [hidde]{display: none !important}
    this.hide = function(){
      document.getElementById(this.id).setAttribute("hidden",true)
      document.getElementById(this.id).setAttribute("style", "display: none !important")
    },

    //change this so that we decide if we are going to use an id or number to search for the ele
    this.addHandler = function(searchByid = true, elementToSearchFor, functionType, functionToAdd, elementChoice){

          if(searchByid){

              let ele = document.getElementById(elementToSearchFor)
              ele.addEventListener(functionType, functionToAdd)

          }else{
            //grab this componets top ele
            let parentElement = document.getElementById(this.id);
            //collection of eles withen comp with name
            let elementChoices = parentElement.getElementsByTagName(elementToSearchFor);

            elementChoices[elementChoice].addEventListener(functionType, functionToAdd);
        }
    },
    this.show = function(){

        document.getElementById(this.id).removeAttribute("hidden");
        //we may want users to be able to do inline styling later on
        //thus we will need to grab that and only remove the display
        document.getElementById(this.id).removeAttribute("style");
    },

    //need an add to document and a remove to document function
    this.removeFromDocument = function(){

        let eleToRemove = document.getElementById(this.id)
        if(eleToRemove === null) return
        eleToRemove.parentNode.removeChild(eleToRemove);

    },

    this.addToDocument = function(whereToAppend = document.body, hideToStart = false){

          if(hideToStart){

            document.getElementById(this.id).setAttribute("hidden", true);
          }

          whereToAppend.appendChild(this.html)
    }



}


module.exports.Builder = Builder;
