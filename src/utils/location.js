const axios = require("axios")

async function getLoc(place){
    try {
        const mapData = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1Ijoia2V2aXQtc2lkIiwiYSI6ImNsbTY3NGJ2NDEwZWczZW54eHhxbjlnaTMifQ.8WZA4l33aKnhENFkdw1LVA&limit=1`)
        if (!mapData.data.features.length) {
            console.log("Location doesn't exist");
            // return "unresolvable"
            return {error : 'Unresolvable location!!!'}
        } else {
            let long = mapData.data.features[0].center[0]
            let lat = mapData.data.features[0].center[1]
            let location = mapData.data.features[0].place_name
            return {long,lat,location}
        }
    } catch (error) {
        console.log("something went wrong in getLoc");
        return {error};
    }    
}

module.exports = getLoc