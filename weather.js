const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

exports.location = function (req, res) {
  const city = req.body.getCity;
  const attachCountry = city + ",nigeria";

  let options = {
    url: "http://api.weatherstack.com/current",
    method: "POST",
    qs: {
      access_key: "900dae88ca26ce188647a6d18334f4f5",
      query: attachCountry
    }
  };

  request(options, function (error, response, body) {
    let data = JSON.parse(body);
    console.log(data);
  });
};
