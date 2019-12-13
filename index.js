require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");


// Fetch static files in public folder
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home");
})

app.post("/", function(req, res) {
  const city = req.body.getCity;
  const attachCountry = city + ",nigeria";

  let options = {
    url: "http://api.weatherstack.com/current",
    method: "POST",
    qs: {
      access_key: process.env.ACCESS_KEY,
      query: attachCountry
    }
  };

  request(options, function(error, response, body) {
    let data = JSON.parse(body);
    res.render("results", {
      location: data.location.name,
      state: data.location.region,
      temperature: data.current.temperature,
      timeZone: data.location.timezone_id,
      localTime: data.location.localtime,
      windSpeed: data.current.wind_speed,
      windDegree: data.current.wind_degree,
      windDirection: data.current.wind_dir,
      pressure: data.current.pressure,
      humidity: data.current.humidity,
      cloudcover: data.current.cloudcover
    });
  });
});


app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server started on port 3000");
})
