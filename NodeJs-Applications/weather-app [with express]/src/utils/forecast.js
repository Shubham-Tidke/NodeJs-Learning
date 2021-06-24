const request = require('request');

const forecast = (latitude, longitute, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1ea231f682e2fda295666639b284c265&query='
        + latitude + ',' + longitute;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Weather service not available!!', undefined);
        }
        else {
            if (body.error) {
                callback('Unable to find location', undefined);
            } else {
                callback(undefined, 'it is currently ' + body.current.temperature + ' degrees & weather is ' + body.current.weather_descriptions[0])
            }
        }
    })
}

module.exports = forecast;


// //api access key for weatherstack.com: 1ea231f682e2fda295666639b284c265
// const url = "http://api.weatherstack.com/current?access_key=1ea231f682e2fda295666639b284c265&query=28.66667,77.21667";
// request({ url: url, json: true }, (err, response) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         if (response.body.error != undefined) {
//             console.log("Invalid request : code " + response.body.error.code + ": " + response.body.error.info);
//         }
//         //fetching temperature and location fro output JSON body
//         else {
//             console.log("location : " + response.body.location.region);
//             console.log("tempreature: " + response.body.current.temperature);

//         }
//     }
// })
