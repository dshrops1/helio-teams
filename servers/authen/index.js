require('dotenv').config();

const monk = require('monk')

// Connection URL
const url = `${process.env.USER}:${process.env.PASS}@${process.env.CONNECTION}`;
const db = monk(url, {authSource: "admin"});
db.then(() => {
  console.log('Connected correctly to server')
})

const collection = db.get("user_collection")

//test working on test data
collection.findOne({id: 1}).then((doc)=>console.log(doc));


//will need to add express in here for authentication
