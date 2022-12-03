const request = require('request')

//pk.eyJ1IjoidGVjaGFua3VyIiwiYSI6ImNsYjZ4a2ExcjA1bWgzeW54ZjJvM2g1aXoifQ.wgn_atM6CAIY84iKw2cgNA

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoidGVjaGFua3VyIiwiYSI6ImNsYjZ4a2ExcjA1bWgzeW54ZjJvM2g1aXoifQ.wgn_atM6CAIY84iKw2cgNA";

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode