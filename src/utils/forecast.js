const request = require('request')


const foreCast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7e279b6851ba642598499e23bc92b855/' + latitude + ','+ longitude
    request ({ url , json: true }, (error, { body }) => {
        if(error) {
            callback("You are not connected api darksky",undefined)
        } else if (/*response.body.error*/ body.error) {
            callback("response data error...", undefined)
        } else {
            callback(undefined, "It is currently " + body.currently.temperature + " degree out. There is "+ body.currently.precipProbability+" % chance of rain.")
        }
    })
} 


module.exports = foreCast