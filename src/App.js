const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {d

    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: "Help",
        name: 'Andrew Mead'
    })
})


app.get('/help/*', (req, res) => {
    res.send("article not found")
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Error"
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})
app.get('*', (req, res) => {
    res.render("404", {
        errorMessage: 'Page not found.',
        title: "Error",
        name: 'Andrew Mead'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})