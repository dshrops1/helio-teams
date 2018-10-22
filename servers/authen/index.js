require('dotenv').config();
const bcrypt = require('bcrypt')
const saltRounds = 10

const testPassword = "Dustbunny1992!"
const testUser = "dshrops1"
let hashedPass = ''

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(testPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)

        bcrypt.compare(testPassword, hash).then(function(res) {
    // res == true
    console.log(res)
});

    });
});

//updated git global
st monk = require('monk')

// Connection URL
// const url = `${process.env.USERF}:${process.env.PASS}@${process.env.CONNECTION}`;
// const db = monk(url, {authSource: "admin"});
// db.then(() => {
//   console.log('Connected correctly to server')
// })
//
// const collection = db.get("user_collection")
//
// collection.insert({})


//we need to set up express and body parser

//add user route
//authenticate user
