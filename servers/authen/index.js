/*
* Authors: Dustin shrosphire
* Notes:
*/

require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const monk = require('monk')
let nodemailer = require('nodemailer');
const path = require("path")

let characterChoices = "abcdefghijklmnopqrstuvwxyz12345678"
let transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.ADMINEMAIL,
        pass: process.env.PASS
    }
});

let mailOptions = {
  from: process.env.ADMINEMAIL, // sender address
  to: "" ,//add email here, // list of receivers
  subject: 'helio teams password reset', // Subject line
  text: ""// plain text body, send link instead will generate random link
};

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

function encryptPassword(password){
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return hash;
    });
});
}

 function emailExsists(email){
      return  collection.findOne({Email: email}).then(res=>{

          if(res !== null){
            return res;
          }else{
            return false;
          }

        })
}

function generateLink(){

  let linkToReturn = "/"
  let linkLengthPossible = 6
  let linkLengthToGenerate = getRandomInt(linkLengthPossible)

  //do we need to worry about async running here?
  for(let i = 0; i <= linkLengthToGenerate; i++ ){
      //should be fine not doing length -1 because getRandomInt handles for us?
      linkToReturn += characterChoices[getRandomInt(characterChoices.length)]
  }

  if(activeEmailLinks.includes(linkToReturn)){
    return generateLink()
  }

  return linkToReturn;
  //check that it doesnt already exsist if it does just call generateLink again

  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

}
//may not need this header but godforbid we have to deal with cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.json())

app.all('*', checkUser)
function checkUser(req,res,next){

  if (activeEmailLinks.includes(req.path)) return next();

  let auth = req.headers.authorization.split(" ")
  //because authorization will be split like this with basic ["basic","user:pass"]
    let data = auth[1]
    //console.log(auth)
    let useAndPass = data.split(":")
    if(useAndPass[0] === process.env.USERF && useAndPass[1] === process.env.PASS){
      //console.log("you have gained access")
      next();
    }else {
      //console.log("you have no rights here")
      res.send(false)

}
}

//createUser
app.post('/createUser', async function(req,res){

    let body = await req.body
    let objectForDatabase = {
      "Email": body.Email,
      "Password": body.Password,
      "Authorized": encryptPassword(body.Authorized),
      "Role": body.Role
    }
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
      let userItem;
      let matched = false;

      userItem =  await emailExsists(body.Email)

      if(userItem != false){
      //if(exsists){

        let matched = await bcrypt.compare(body.Password, userItem.Password)
        //should also check here that the user authorization field is true making them an active user
        if(matched){
          res.send(matched)
        }else {
          res.send(matched)
        }
      }else{
        res.send(false)
      }
})

app.post("/sendPasswordResetEmail", async function(req, res){

        //steps
        //check that email exsists in our database
        let doesEmailExsistInDatabase = emailExsists(req.body.Email)
        if(doesEmailExsistInDatabase != false){
            //generate link here and add to mailOptions
            let linkToAdd = generateLink()
            //add object instead with a time to live and we will create an event so
            //when that time to live dies we remove that link
            activeEmailLinks.push(linkToAdd)
            console.log("sendPassword added link: " + linkToAdd)

            mailOptions.to = req.body.Email

            mailOptions.text = process.env.SELFADDRESS + linkToAdd
            //console.log(mailOptions)
            //send email
            transporter.sendMail(mailOptions, function (err, info) {
              if(err){
              //console.log(err)
              res.send(false)
            }else{
              //console.log(info);
              res.send(true)
            }
            });
        }else{
          res.send(false)
        }
})

//update password in database? email link will use this
app.post("/updatePassword", function(req,res){

})

app.get(activeEmailLinks, function(req,res){
  res.sendFile(path.join(__dirname + "/expressFiles/resetPassword.html"))
})

//user exsists route for reseting password

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
