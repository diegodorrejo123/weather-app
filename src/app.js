const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000



const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Diego'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Diego'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Diego'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Diego',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if(!address){
        return res.send({
            error: "You must provide an address."
        })
    }
    forecast(address, (error, {text, location} = {}) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: text,
            location,
            address
        })
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Diego'
    })
})



app.listen(port, () => { 
    console.log('Server is up on port ' + port);
})