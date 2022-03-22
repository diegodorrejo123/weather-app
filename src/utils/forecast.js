const request = require('request')



const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=04b0302bc836500ad237442b38e2202b&query=' + address

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                text: 
                    body.current.weather_descriptions + '. It is currently ' + body.current.temperature + 
                    ' degress out. There is a ' + body.current.precip + '% chance of rain.' +
                    'The humidity is ' + body.current.humidity + '%.', 
                location: body.request.query
            })
        }
    })
}

module.exports = forecast