require('dotenv').config();
const express = require("express")
const app = express()
const port = 3000;
const bodyParser = require('body-parser')
const monk = require('monk')

//an array of objects containing the active email link to webpages that we will serve with users
//atached as well as maybe a life time for resetting password
let activeEmailLinks = []

//Connection URL
const url = `${process.env.USERF}:${process.env.PASS}@${process.env.CONNECTION}${process.env.DATABASE}`;
const db = monk(url, {authSource: "admin"});
db.then(() => {
  console.log('Connected correctly to server')
})
const collection = db.get(process.env.COLLECTION);


//we need to set up express and body parser

//routes
//add user route
//authenticate user
//reset password


//may not need this header but godforbid we have to deal with cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

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
app.post('/', async function(req,res){
    let body = await req.body
    //steps
    //1) grab all items needed from the req object to create our database object to insert
    let objectForDatabase = {
      "Email": body.Email,
      "Password": body.Password,
      "Authorized": body.Authorized,
      "Role": body.Role
    }

    let test = true;
    let objectValues = Object.values(objectForDatabase)
    objectValues.forEach(x => {
      if(x === undefined){ res.send("please proper body"); test = false }
    })

    console.log(objectForDatabase);
    //2) if all items are there insert into DATABASE if not return error
    //3) if done return sucess responce
    if(test) res.send(objectForDatabase)

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
