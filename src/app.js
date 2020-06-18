const path= require('path')
const express = require('express')
const hbs=require('hbs')
//loading backend dependency
const request =require('request')
const geocode=require('./utils/geocode')
const forecast= require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000
//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kalyani Deshmukh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Kalyani Deshmukh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'FAQ',
        message:'Please ask your question',
        name:"Kalyani Deshmukh"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must fd provide location.'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude,location} ={}) => {
        if (error){
            return res.send({error})
        }
    
    forecast(longitude, latitude,(error, forecastData) => {
        if (error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

      })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
        
    }
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Kalyani Deshmukh",
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Kalyani Deshmukh",
        errorMessage:'Page not found.'
})
})   
app.listen(port,()=>{
    console.log('Server is up and running on port '+port)
})