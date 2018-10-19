/*
* Author: Dustin Shropshire
*
* ComponetBuilder is a simple module builder used for specifying how an html page should be build
* as well as how it should change in responce to events.
*/

 function Builder(html,id){

    this.html = html,
    this.id = id,
    this.build = function(addToDocument,hideToStart=false){
      //if arg is passed as true we create and append to body
      if(addToDocument){


        let eleCreated = document.createElement("div");
        eleCreated.setAttribute("id",this.id)
        eleCreated.innerHTML = this.html
        document.body.appendChild(eleCreated);

        if(hideToStart){
          this.hide();
        }

        //else we return the html
      }else{

         return this.html;
      }
    },

    this.hide = function(){document.getElementById(this.id).setAttribute("hidden",true)},

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
    }


}


module.exports.Builder = Builder;
