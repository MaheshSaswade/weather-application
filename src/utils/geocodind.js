const request = require('request')


const geoCoding = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ adress +'.json?access_token=pk.eyJ1IjoibWFoZXNoMjEiLCJhIjoiY2syZXB6NjM1MGMzZDNjcXBuNjV3bnI2dSJ9.gwEfQ_zrhXl4T9B5W76DQQ';
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback("You are not connected api mapbox",undefined)
        } else if(/*response.body.features.length === 0*/ body.features.length === 0) {
            callback("Unable to find location. Try another search",undefined)
        } else {
            data ={
                // longitude : response.body.features[0].center[0],
                longitude : body.features[0].center[0], 
                latitude : body.features[0].center[1],
                place_Name : body.features[0].place_name
            }
            callback(undefined,data);
        }
    })
}


module.exports = geoCoding