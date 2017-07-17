// This program is used to serve the data to the user and also hash the solutions.
// The solutions are stored as hashes to prevent user from submitting answers to
// problems they haven't solved themselves.

var express = require("express"),
    morgan = require("morgan"),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    bcrypt = require('bcryptjs');

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets"));

app.get("/allSolutions", function (req, res) {
    fs.readFile("hashedSolutions.json", function (err, data) {
        // Convert data to string before parsing.
        res.json(JSON.parse(String(data)));
    });
});

// This route isn't publicly available. Only used when new solutions are added.
/*app.get("/updateSolutions", function (req, res) {
    fs.readFile("solutions.json", function (err, data) {

        // Convert file data to string before parsing as JSON.
        var solutionData = JSON.parse(String(data));

        // Create hashes of solutions.
        for (var sol of solutionData) {
            var hash = bcrypt.hashSync(String(sol.solution));
            sol.solution = hash;
        }

        // Create the file that is holds the data sent to user.
        fs.writeFile("hashedSolutions.json", JSON.stringify(solutionData), function (err) {
            if (err) {
                res.send("Failed to hash solutions.");
            } else {
                res.send("Success");
            }
        });

    });
});*/

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
    console.log("server listening on port 3000");
});