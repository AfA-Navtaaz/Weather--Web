const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const templatesDirectory = path.join(__dirname,'views/view')
const partialsDirectory = path.join(__dirname,'views/partials')
const weatherDirectory = path.join(__dirname,'utils/forecast.js')

const forecast = require(weatherDirectory)

const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views',templatesDirectory)
hbs.registerPartials(partialsDirectory)

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        Author: 'Navtaaz Singh'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        Author: 'Navtaaz Singh'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        Author: 'Navtaaz Singh'
    })
})


app.get('/weather', (req, res) => {

  if(!req.query.search){  
      return res.send({
          error: 'Please enter search loaction'
      })
  }
    
  forecast(req.query.search, (error, forecastData) => {
    if (error) {
        return res.send({error})
    }

    res.send({
        title:'Weather',
        location: req.query.search,
        weather: forecastData
    })
})

})

app.get('/help/*',(req,res)=>{
    res.render('Not',{
        title: 'Not Found',
        Author: 'Navtaaz Singh',
        errormsg: 'Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('Not',{
        title: 'Not Found',
        Author: 'Navtaaz Singh',
        errormsg: 'Page not found'
    })
})
app.listen(port, () => {
 console.log('Server is up on port'+port)
})