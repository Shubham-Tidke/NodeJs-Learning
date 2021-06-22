const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//process.argv[2] reads command line argument!
//calling geocode
const city = process.argv[2];
if (!city) {
    console.log('please provide a city to get weather forecast!![example: "node app.js london"]');
} else {
    geocode(city, (error, response) => {
        if (error !== undefined)
            return console.log('geocode error!!', error);
        else {
            //  console.log('Location Details', response);
            forecast(response.longitude, response.latitude, (error, forecastresponse) => {
                if (error !== undefined)
                    return console.log('forecast error!!', error);
                else {
                    console.log('Weather details fetched!');
                    console.log(response.location);
                    console.log(forecastresponse.temperature + " degress");
                    console.log("weather : " + forecastresponse.weather[0]);
                }
            });
        }
    })

}
