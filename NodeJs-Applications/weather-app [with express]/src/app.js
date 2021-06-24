const express = require('express');
const request = require('request');
const hbs = require('hbs');
const path = require('path');
const publicDir = path.join(__dirname, '../public');
const partialpath = path.join(__dirname, '../public/partials');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//setting up for handling dynamic pages [handlebars]
app.set('view engine', 'hbs');
//to serve all static html pages from directory[css and images]
app.use(express.static(publicDir));
//registering partials to use
hbs.registerPartials(partialpath);

//renering dynamic content
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'shubham'

    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page!',
        name: 'shubham'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page!! ',
        name: 'shubham'
    })
})
//handling input query
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "Please provide address!" })
    }
    //geocode gets latitude,longitude,location of the address[req.query.address] and provide it to forecast
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        //takes the latitude and longitude of location and renders the weather forecast [forecastData]
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address,
    //     forecast: 'rainy'
    // })
    // console.log(req.query.address);
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found'
    })
})
//handling error 404 [must be the last request]
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        name: 'shubham'
    })
})


//lisening server 
app.listen(3000, () => {
    console.log('server is up!!');
});