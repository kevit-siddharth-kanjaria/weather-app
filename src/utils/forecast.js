const axios = require("axios")
const getLoc = require("./location")

async function getWeather(place) {
    try {
        const {error, long, lat, location} = await getLoc(place)
        if(error) {
            return { error }
        }
        {
            const weatherData = await axios.get(`http://api.weatherstack.com/current?access_key=18982573cb0f6dc5ad451a46a1f685ea&query=${lat},${long}&units=f`)
            let temp = weatherData.data.current.temperature
            let precip = weatherData.data.current.precip
            let description = weatherData.data.current.weather_descriptions[0]
            // console.log(`It is ${description}, the temperature is ${temp} F and there is ${precip}% chance of rain in ${location}`)
            return {
                forecast: description,
                temperature: temp,
                precipitation: precip,
                location: location
            }
        }
    } catch (error) {
        console.log("something went wrong in getWeather");
        return { error };
    }
}

module.exports = getWeather