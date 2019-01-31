require('dotenv').config();

// Get JavaScript SDK for Mapbox
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

// Return location data
async function geocoder(location) {
    try {
        let response = await geocodingClient.forwardGeocode({
            query: location,
            limit: 1
        }).send()

        console.log(response.body.features[0].geometry.coordinates);
    } catch (error) {
        console.log(error.message)
    }
}

geocoder('New York, US');