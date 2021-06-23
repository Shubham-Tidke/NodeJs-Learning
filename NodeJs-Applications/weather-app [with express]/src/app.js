const express = require('express');
const path = require('path');
const publicDir = path.join(__dirname, '../public');


//console.log(viewspath);
const app = express();


//setting up for handling dynamic pages [handlebars]
app.set('view engine', 'hbs');

//to serve all static html pages from directory[css and images]
app.use(express.static(publicDir));

//renering dynamic content
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'shubham'

    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page!'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page!!'
    })
})


// app.get('/weather', (req, res) => {
//     res.send({
//         city: 'pune',
//         tempreature: '36 degrees'
//     })
// })
//lisening server 
app.listen(3000, () => {
    console.log('server is up!!');
});