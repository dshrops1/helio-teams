//here we will build the module to add modules to html and export an object with the functions

/*
 * what we are trying to do is to build our own simple spa lib
 * any compoentBuilder object that is created will be injected into the
 * document body with a method something like create()
 * when created it will take a template string that builds out the html
 * which means youll be able to build complex components by passing another components
 * html
 *
 *todo: add a unhide method, allow modifing of html ...what else?
*/

 function Builder(html,id){

   //maybe instead of adding id twice down there we do it here
    this.html = html,
    //append this id to div created for this element
    this.id = id,
    this.build = function(addToDocument,hideToStart=false){
      //if arg is passed as true we create and append to body
      if(addToDocument){

        //lets think about how we are doing this could we just set document.body.innerHTML
        //let node = document.createElement("div")
        //breaking dry princ with id so we will figure that out later
        //node.setAttribute("id", id)
        //node.innerHTML = html;
        //document.body.appendChild(node)


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

    //maybe a function that you specify a number and thats the number down in the doucment of the element you want to add the click handler to?
    //such as you can pass <Button> , 2 and it will look for the second button and add the function you give it?

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
