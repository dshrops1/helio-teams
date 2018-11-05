require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const monk = require('monk')

//an array of objects containing the active email link to webpages that we will serve with users
let activeEmailLinks = []
const port = 3000;
const saltRounds = 10;

//database connection
const url = `${process.env.USERF}:${process.env.PASS}@${process.env.CONNECTION}${process.env.DATABASE}`;
const db = monk(url, {authSource: "admin"});
db.then(() => {
  console.log('Connected correctly to server')
})
const collection = db.get(process.env.COLLECTION);

//reset password

function encryptPassword(password){

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

        return hash;
    });
});

}



//may not need this header but godforbid we have to deal with cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

/*
* middleware to make sure this connection is authroized
*/
app.use(function(req,res,next){

  let auth = req.headers.authorization.split(" ")
  let data = auth[1]
  let buff = new Buffer.from(data, 'base64')
  let text = buff.toString('ascii')
  let useAndPass = text.split(":")

  if(useAndPass[0] === process.env.USERF && useAndPass[1] === process.env.PASS){
    next();
  }else {
    res.send(false)
  }


})

app.use(bodyParser.json())


//createUser
app.post('/createUser', async function(req,res){
    let body = await req.body

    let objectForDatabase = {
      "Email": body.Email,
      "Password": body.Password,
      "Authorized": encryptPassword(body.Authorized),
      "Role": body.Role
    }

    console.log(objectForDatabase);
    let properData;

    //for now we will just make sure that values are not undefined and later on we will
    //update for more advanced checking
  properData =  Object.values(objectForDatabase).reduce(function(accum, curr){

            if(curr != undefined){

              accum = true;
            }else{
              accum = false;
            }

    })


    if(properData){
      collection.insert(objectForDatabase)
      res.send(true)
    };
})

//route for checking if a users credentials are authroized
//so we will pass the form data and check against DATABASE
app.post("/authorizeUser", async function(req,res){
      //we can prob refact to keep DRY and have this be part of the middleware
      let body = await req.body
      let exsists = false;
      let userItem;
      let matched = false;
      let responceObject = res
      //check that email exsists then grab password and compare bcrypt hash send to one in database
      //if null then does no exsist
      await collection.findOne({Email: body.Email}).then(res=>{
        //console.log(res)
        if(res !== null) exsists = true;
        userItem = res;
      })

      if(exsists){

      let matched = await bcrypt.compare(body.Password, userItem.Password)

        if(matched){

          res.send(matched)

        }else {

          res.send(!matched)
        }

      }else{

        res.send(false)
      }


})


app.post("/updatePassword", function(req, res){

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
