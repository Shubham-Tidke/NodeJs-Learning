const request = require('request');

const geoAccessToken = "pk.eyJ1Ijoic2h1YmhhbXRpZGtlIiwiYSI6ImNrcTZweXQwMjA0N3kydm82bGJjeG44MW8ifQ.KqryjCbS5UqIC5ILL0nrnA";
const city = "chennai"
const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${geoAccessToken}`;
request({ url: geoCodingUrl, json: true }, (err, response) => {
    if (err) {
        console.log("unable to connect GeoCoding API");
    } else {
        //if error in provided input,i.e. invalid city,or invaid access token
        if (response.body.message != undefined) {
            console.log(response.body.message);
        }
        //fetching latitude and longitude from output body JSON
        else {
            const latitude = response.body.features[0].center[0];
            const longitude = response.body.features[0].center[1];
            console.log(latitude, longitude);
        }
    }
})
//api access key for weatherstack.com: 1ea231f682e2fda295666639b284c265
const url = "http://api.weatherstack.com/current?access_key=1ea231f682e2fda295666639b284c265&query=13.09,80.27";
request({ url: url, json: true }, (err, response) => {
    if (err) {
        console.log(err);
    }
    else {
        if (response.body.error != undefined) {
            console.log("Invalid request : code " + response.body.error.code + ": " + response.body.error.info);
        }
        //fetching temperature and location fro output JSON body
        else {
            console.log("location : " + response.body.location.name);
            console.log("tempreature: " + response.body.current.temperature);

        }
    }
})
