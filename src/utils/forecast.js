const request = require('request')

const forecast = (address, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=14dded59c340c00b788bb6ebc54e6b34&units=metric'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.message) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ', It is currently ' + response.body.main.temp + ' Degress out, And it feels like ' + response.body.main.feels_like+ ' Celcius Degree')
        }
    })
}

module.exports = forecast

// response.body.weather[0].description + 