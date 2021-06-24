const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2h1YmhhbXRpZGtlIiwiYSI6ImNrcTZweXQwMjA0N3kydm82bGJjeG44MW8ifQ.KqryjCbS5UqIC5ILL0nrnA'

    //json:true will parse the response!
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!!', undefined);
        } else {
            //if error in provided input,i.e. invalid city,or invaid access token
            if (body.features.length === 0) {
                callback('Invalid location,try again!', undefined)
            }
            //fetching latitude and longitude from output body JSON
            else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        }
    })
}

module.exports = geocode;

// const geoAccessToken = "pk.eyJ1Ijoic2h1YmhhbXRpZGtlIiwiYSI6ImNrcTZweXQwMjA0N3kydm82bGJjeG44MW8ifQ.KqryjCbS5UqIC5ILL0nrnA";
// const city = "Delhi"
// const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${geoAccessToken}`;
// request({ url: geoCodingUrl, json: true }, (err, response) => {
//     if (err) {
//         console.log("unable to connect GeoCoding API");
//     } else {
//         //if error in provided input,i.e. invalid city,or invaid access token
//         if (response.body.message != undefined) {
//             console.log(response.body.message);
//         }
//         //fetching latitude and longitude from output body JSON
//         else {
//             const latitude = response.body.features[0].center[0];
//             const longitude = response.body.features[0].center[1];
//             console.log(latitude, longitude);
//         }
//     }
// })
