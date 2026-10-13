var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());

app.use(function (request, response) {
    //console.log("In comes a request to: " + request.url);
    //response.end("Hello, world!");

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
                src: 'images/math.jpg',
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
                src: 'images/physics.jpg',
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
                src: 'images/chemistry.jpg',
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
                src: 'images/computer.jpg',
                alt: 'Computer science course'
            }
        }

    ];
    response.json(products)
});

app.listen(3000, function () {
    console.log("App started on port 3000");
}); 