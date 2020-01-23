const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1347159a98d02e2abb28f4409038d8b9/' + latitude + ',' + longitude + '?units=si'
    request( { url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability * 100.00) + '% chance of rain. ' +
                              'Daily temperature high is: ' + body.daily.data[0].temperatureHigh + ', low is: ' + body.daily.data[0].temperatureLow + 
                              '. The pressure is ' + body.currently.pressure + '. ')
        }
    })
}

module.exports = forecast


/* add: temp high/low for the day */