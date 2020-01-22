const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiamFjZWthZGFtb3dpY3oiLCJhIjoiY2s1ZTF3dWU2MDBoMTNncXI0bzVtNHduMSJ9.09l4kpg_ahL2NFlvbLC5cA'
    request( { url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback( 'Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback( 'Unable to find the location. Try another search.', undefined)
        } else {
            callback( undefined, {
                latitude:   body.features[0].center[1],
                longitude:  body.features[0].center[0],
                location:   body.features[0].place_name
            })
        }
    })
}

module.exports = geocode