//here we will build the module to add modules to html and export an object with the functions

/*
 * what we are trying to do is to build our own simple spa lib
 * any compoentBuilder object that is created will be injected into the
 * document body with a method something like create()
 * when created it will take a template string that builds out the html
 * which means youll be able to build complex components by passing another components
 * html
 *
 *
*/
 function Builder(html){

    this.html = html,

    this.build = function(arg){
      //if no args passed we create and append to body
      if(arg){

        let node = document.createElement("div")
        node.innerHTML = html;
        document.body.appendChild(node)


        //else we return the html
      }else{

         return this.html;
      }
    }




}


module.exports.Builder = Builder;
