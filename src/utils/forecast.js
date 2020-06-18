const request =require('request')

const forecast = ( latitude, longitude,callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=fd0aff93a36b481231033b2d3e12a33b&query='+ latitude +','+ longitude 
    request ({url : url, json : true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+ '. It is currently ' + body.current.temperature +' degree but it feels like '+ body.current.feelslike +' degree. Humidity: '+body.current.humidity +'.     Have a pleasant time !'
            )
        }
            })
}




module.exports= forecast