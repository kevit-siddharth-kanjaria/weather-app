const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getWeather = require("./utils/forecast")


const app = express()

//express paths config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//handlebars engine setup
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static directory setup
app.use(express.static(publicDirectoryPath))

//check "http-serve"

app.get('', (req,res)=>{
    res.render('index',{
        title:'WeatherPage!',
    })
})

let number_of_req = 0
//this is made async cause the forecast mech is async and to get response we'll need to await it
app.get('/weather', async (req,res) => {

    const add = req.query.address

    if(!add){
        return res.send({
            error: "Address not provided!"
        })
    }   

    try {
        const recived_forecast = await getWeather(add)

        if(recived_forecast.error){
            return res.send({ error : recived_forecast.error })
        }

        number_of_req++; 
        console.log(number_of_req,recived_forecast);
    
        res.send({
            title:'Weather Page!',
            forecast:recived_forecast.forecast,
            temperature:recived_forecast.temperature,
            precip:recived_forecast.precipitation,
            location:recived_forecast.location        
        })
    } catch (error) {
        number_of_req++; 
        console.log(number_of_req,"something went wrong in src/app.js/weather");
        return res.send({error})
    }
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About me!',
        name:"Siddharth"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Help!?',
        msg:"Some help here"
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        title:'Oops!!!!',
        err_msg:'404, help page not found'
    })
})

app.get('*', (req,res)=>{
    res.render('error',{
        title:'Oops!!!!',
        err_msg:'404, page doesnt exist'
    })
})

app.listen(3000, ()=>{
    console.log("Server on port 3000.");
}) 