const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Jacek Adamowicz'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jacek Adamowicz'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is a help message',
        name: 'Jacek Adamowicz'
    })
})

app.get('/weather', (req,resp) => {
    const address = req.query.address
    if (!address) {
        return resp.send({
            error: 'Please provide the address'
        })
    }

    geocode( address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return resp.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return resp.send({error})
            }
            resp.send({ location, forecast: forecastData, address})
          })
    })

})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({ 
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({ products: [] })
})

app.get('/help/*', (req,resp) => {
    resp.render('404', { title: 'Help 404', errorMessage: 'Help article not found', name: 'Jacek Adamowicz'})
})

app.get('*', (req,res) => {
    res.render('404',{ title: '404', errorMessage: 'Page not found', name: 'Jacek Adamowicz'})
}) 

app.listen( 3000, () => {
    console.log('Server is up on port 3000.')
} )