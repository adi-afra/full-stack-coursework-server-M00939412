var express = require("express");
var path = require("path");

var app = express();
var cors = require("cors");
var publicPath = path.resolve(__dirname, "staticFiles");

app.use(cors());
app.use(express.json()); 

let products = [
    {
        id: 1,
        subject: 'Math',
        title: 'Mathematics Course',
        description: 'Learn mathematics through clear explanations, examples, and practical exercises.',
        location: 'London',
        price: 100,
        availability: 2,

        image: {
            src: 'http://localhost:3000/images/math.jpg',
            alt: 'Mathematics course'
        }
    },


    {
        id: 2,
        subject: 'Physics',
        title: 'Physics Course',
        description: 'Learn the fundamentals of physics and understand how the world around us works.',
        location: 'London',
        price: 120,
        availability: 100,

        image: {
            src: 'http://localhost:3000/images/physics.jpg',
            alt: 'Physics course'
        }
    },


    {
        id: 3,
        subject: 'Chemistry',
        title: 'Chemistry Course',
        description: 'Explore atoms, molecules, reactions, and the fundamentals of chemistry.',
        location: 'Manchester',
        price: 90,
        availability: 100,

        image: {
            src: 'http://localhost:3000/images/chemistry.jpg',
            alt: 'Chemistry course'
        }
    },


    {
        id: 4,
        subject: 'Computer Science',
        title: 'Computer Science Course',
        description: 'Learn programming, algorithms, data structures, and computer science fundamentals.',
        location: 'Birmingham',
        price: 150,
        availability: 100,

        image: {
            src: 'http://localhost:3000/images/computer.jpg',
            alt: 'Computer science course'
        }
    }

];

// logger that console log the api request coming 
app.use(function (request, response, next) {
    console.log("Incoming " + request.method + " request on " + request.url);
    next();
});

// GET requests that send all of the courses
app.get("/courses", function (req, res) {
    res.json(products)
});

app.post("/order", function (req, res) {
    var body = req.body;
    console.log(body);
    console.log("New Name Recieved: " + body.name + " " +
        body.number);
    res.json("New Name Recieved: " + body.name + " " +
        body.number);
});

//send static files 
app.use("/images", express.static(publicPath));

//Error in case an unkown request comes in
app.use(function (request, response) {
    response.status(404).send("Page not found!");
});

app.listen(3000, function () {
    console.log("App started on port 3000");
}); 