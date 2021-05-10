"use strict";
var express = require('express');
var app = express();
var port = 80;
var request = require('request');
app.get('/', function (req, res) {
    request('https://randomuser.me/api/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            body.results[0]["jobs"] = "fullstack dev at ssense";
            var person = body;
            res.send(person);
        }
    });
});
app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
