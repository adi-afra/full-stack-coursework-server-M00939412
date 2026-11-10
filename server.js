var express = require("express");
var path = require("path");
const { ObjectId } = require('mongodb');

var app = express();
var cors = require("cors");
var publicPath = path.resolve(__dirname, "staticFiles");

app.use(cors());
app.use(express.json());

//connection to database
require("dotenv").config({ path: "config.env" });
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_PREFIX + process.env.MONGODB_USERNAME + ":" +
    process.env.MONGODB_PASSWORD + process.env.MONGODB_URL;
const client = new MongoClient(uri);
const db = client.db("after_school_db");

const port = process.env.PORT||3000; 
// logger that console log the api request coming 
app.use(function (request, response, next) {
    console.log("Incoming " + request.method + " request on " + request.url);
    next();
});

// GET requests that send all of the courses
app.get("/courses", async function (req, res) {
    let collection = await db.collection("Lessons");
    let results = await collection.find({}).toArray();
    res.send(results);
});

//POST request that for now logs the infromation of a user and the courses they checked out with
app.post("/order", async function (req, res) {
    var body = req.body;
    console.log(body)
    let collection = await db.collection("Orders");
    let result = await collection.insertOne(body);
    res.send(result);
});

// PUT request to chnage a lesson (incerment a integer field)
app.put("/courses/:_id", async function(req, res) { 
 
    var body = req.body; 
    let collection = await db.collection("Lessons"); 
    let tempid = req.params._id; 
     
    const query = { _id: new ObjectId(tempid) }; 
    const updates = { 
      $inc: req.body 
    }; 
    result = await collection.updateOne(query, updates); 
    res.send(result); 
    console.log(result); 
}); 

// GET request to send the enrolled number of a lesson based on the _id of the lesson
app.get("/enrolment/:_id", async function(req, res) {
    let collection = await db.collection("Lessons");

    let tempid = req.params._id; 
    const query = { _id: new ObjectId(tempid) }; 

    let result = await collection.find(query).toArray();
    res.send(result[0].enrolled);

});

//send static files 
app.use("/images", express.static(publicPath));

//Error in case an unkown request comes in
app.use(function (request, response) {
    response.status(404).send("Page not found!");
});

app.listen(port, function () {
    console.log("App started on port 3000");
}); 